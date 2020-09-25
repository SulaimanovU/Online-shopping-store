exports.client = (userData) => {
    
    let htmlTemplate = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        </head>
        <body>
           <div class="container" style="width: 500px; margin: 0 auto;">
               <section style="padding-top: 40px; padding-left: 50px; padding-right: 50px; text-align: center">
                   <div class="block">
                       <h1 style="text-align: center; font-family: sans-serif; font-size: 26px; margin-bottom: 50px;">Hello Dear User</h1>
                       <p style="font-family: sans-serif; font-size: 17px; margin-bottom: 50px;">

We want to make sure you have the tools needed to turn your big ideas into reality. Mailchimp’s mission is to empower the underdog. Our co-founders, Ben and Dan, understand small businesses because it’s part of their DNA. Long story short: we want to see you win! Whether you are just starting out or ready for the next step, Mailchimp is the all-in-one Marketing Platform you need to grow your business. Start exploring the platform for ways to build on what you’ve already accomplished..

                       </p>
                       <div style="width: 250px; height: 50px; background-color: #D2221E; border-radius: 5px; padding-top: 5px; margin: 0 auto; margin-bottom: 70px;">
                           <p style="text-align: center;">
<a href="http://localhost:3000/user/verify?email=${userData.email}&hashedpw=${userData.password}" style="text-align: center; text-decoration: none; color: white;">Click to verify your mail</a>
                           </p>
                       </div>
                       <p style="text-align: center; margin: 0; color: gray">С уважением,</p>
                       <p style="text-align: center; margin: 0; color: gray; padding-bottom: 50px;">BrandName.kg</p>
                   </div>
               </section>
               <header>
                    <p style="text-align: center; color: gray; padding: 30px 0px;">© 2020 BrandName.kg. All rights reserved.</p>
               </header>
           </div>
        </body>
        </html>`;
    
    return htmlTemplate;
    
}

