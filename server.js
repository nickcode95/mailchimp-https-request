app.post('/', (req, res)=> {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let email = req.body.email;

    let data = {
        members: [
            {
                email_address: email,
                status: "pending",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    }

    let jsonData = JSON.stringify(data);   

    const url = `https://us12.api.mailchimp.com/3.0/lists/${process.env.listid}`;

    const options = {
        method: 'POST',
        auth: process.env.api
    }

    const request = https.request(url, options, (response)=> {
        response.on("data", (d) => {
            if (response.statusCode === 200)  {
                res.render('success', {
                    title: "Success"
                });
                setTimeout(()=> {
                    window.location = ('/');
                }, 900000)
            } else {
                res.render('failure', {
                    title: "Failure"
                });
                setTimeout(()=> {
                    window.location = ('/');
                }, 30000)
            }
           
        })
    })

    request.write(jsonData);
    request.end();
})
