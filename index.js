const Discord = require('discord.js');
const sql = require('sqlite3').verbose();
const client = new Discord.Client();

client.login(process.env.BOT_TOKEN);


client.on('ready', ()=>
{
    console.log("lmao");
});

client.on('message', (message)=>
{
    if(message.author == client.user)
    {
        return;
    }

    let command;
    let parameter;
    if(message.content.substring(0, 1) == "!")
    {
        if(message.content.search(" ") == -1)
        {
            if(message.content.substring(1) != "")
            {
                command = message.content.substring(1);
            }
            else
            {
                message.reply("no command");
            }
        }
        else
        {
            parameter = message.content.substring(message.content.search(" ") + 1);
            command = message.content.substring(1, message.content.search(" "));
        }
    }
    if(command){
        switch(command)
        {
            case "delete":
                message.reply("deleting " + parameter + " messages");
                break;
            case "hello":
                message.reply("hi");
                break;
            case "say":
                message.channel.send(parameter);
                break;
            case "db":
                
                var db = new sql.Database('./db/test.db', (err) => {
                    if (err) 
                    {
                        return console.error(err.message);
                    }
                    console.log('Connected to the in-memory SQlite database.');
                });

                db.serialize(function()
                {
                    db.all(parameter, (err, result)=>{
                        if(err)
                        {
                            message.reply(err.message);
                        }
                        else
                        {
                            message.reply(result);
                        }
                    });
                });

                db.close((err) => {
                    if (err) {
                    return message.reply(err.message);
                    }
                    console.log('Close the database connection.');
                });
                break;
            default:
                message.reply("not a valid command");
                break;

        }
    }
});
