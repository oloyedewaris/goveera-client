import React from "react";

function Privacy() {
  return (
    <div>
      <h2>Privacy Policy (MyBudget)</h2>
      <p>
        Your privacy is important to us. It is <strong>MyBudget's</strong> policy to
        respect your privacy while using our apps
      </p>
      <p>We only ask for personal information when we truly need it to provide a service to you.
        We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we're
        collecting it and how it will be used.
      </p>
      <p> We only retain collected information for as long as necessary to
        provide you with your requested service. What data we store, we'll protect within commercially acceptable means
        to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</p>
      <p> We don't share any personally identifying information publicly or with third-parties</p>
      <p>MyBudget app only used the collected information to provide best performace and experience while using the app</p>
      <p>To use MyBudget, you'll have to provide your name and currency you use so as to give you the best experience</p>
      <p> Hopefully that has clarified things for you and as was previously mentioned if
        there is something that you aren't sure.
      </p>
      <p>We also assure you that all information (name and currency) are used only in the app without sending or fetching to external API or</p>
      <p> This policy is effective <strong>{new Date().getFullYear()}</strong>.</p>
    </div>
  );
}

export default Privacy;
