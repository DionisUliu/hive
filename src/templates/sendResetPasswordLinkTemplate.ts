export const sendResetPasswordLinkTemplate = (
  fullName: string,
  link: string,
) => {
  return `
 <mjml>
  <mj-head>
    <mj-title>Verify your Hive email for password reset</mj-title>
    <mj-font name="Roboto" href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500"></mj-font>
    <mj-attributes>
      <mj-all font-family="Montserrat, Helvetica, Arial, sans-serif"></mj-all>
      <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px"></mj-text>

    </mj-attributes>
  </mj-head>
  <mj-body>
    <mj-section padding="0 0 20px 0">
    </mj-section>

    <mj-section padding="0 0 20px 0">
    </mj-section>

    
    <mj-section background-color="#fafafa">
      <mj-group>
        <mj-column width="100%" >
            <mj-text align="center" font-weight="600" padding-left="10px" font-size="25px" >
            Hive
          </mj-text>
        </mj-column>
</mj-group>
      </mj-section>
    <mj-section padding="0px 10px 0px 10px" background-color="#fafafa">
      <mj-column>
        <mj-text align="center" font-weight="400" padding="30px 20px 0 20px" font-size="32px" line-height="40px" color="#fdc33b">Welcome ${fullName}!</mj-text>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 20px" background-color="#fafafa">
      <mj-column>
        <mj-divider width="30px" border-width="3px" border-color="#9B9B9B"></mj-divider>
      </mj-column>
    </mj-section>
    <mj-section padding="0 20px 40px 20px" background-color="#fafafa">
      <mj-column width="80%">
        <mj-text align="center" padding-top="10px" font-size="13px" font-weight="200" padding="0px">
          Thank you for using our app. We are happy to have you!

        </mj-text>
                <mj-text align="center" padding-top="10px" font-weight="500" padding="0px">
          Please, click the button below to reset your password.       
        </mj-text>
        <mj-button href="${link}" align="center" background-color="#fdc33b" padding-top="40px" >
          Reset Password
        </mj-button>
      </mj-column>
    </mj-section>
    <mj-section padding="10px 0 20px 0" background-color="#fafafa">
      <mj-column>
        <mj-text align="center" color="#9B9B9B" font-size="11px">
          <a href="https://softup.co/" style="color: #9B9B9B; text-decoration:none;">Made by Softup Technologies GmbH</a>
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
  `;
};
