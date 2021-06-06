import SparkPost from 'sparkpost';
const options = {
  endpoint: 'https://dev.sparkpost.com:443'
};
const client = new SparkPost(process.env.SPARKPOST_API_KEY,options);


export const sendEmail = async (recipient: string,url: string) => {
    const response = await client.transmissions.send({
        options: {
            sandbox: true
        },
        content: {
            from: "testing@artisoft.com",
            subject: "Confirm Email - Artisoft",
            html: 
            `<html>
                <body>
                    <p>Testing sparkpost for confirming emails</p>
                    <a href="${url}">Confirm Email</a>
                </body>
            </html>`
        },
        recipients: [
            {address: recipient}
        ]
    });
    // console.log(response);
    console.log("Sending the email");
}