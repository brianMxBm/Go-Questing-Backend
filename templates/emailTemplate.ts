// @TODO - Implement proper templates in production
// @TODO - Modularize templates

// Verification code email template
const generateEmailTemplate = (OTP: string) => `
        <!DOCTYPE html>
        <html>
            <body>
                <h1>Verification Code ${OTP}</h1>
            </body>
        </html>
    `;

// Welcome message email template
const welcomeEmailTemplate = (heading: string, message: string) => `
    <!DOCTYPE html>
    <html>
        <body>
            <h1>${heading}</h1>
            <h1>${message}</h1>

        </body>
    </html>
`;

// Forgot password email template
const forgotPasswordTemplate = (url: string) => `
    <!DOCTYPE html>
    <html>
        <body>
            <h1>${url}</h1>
        </body>
    </html>
    `;

// Reset password instructions email template
const resetPasswordTemplate = (heading: string, message: string) => `
    <!DOCTYPE html>
    <html>
        <body>
            <h1>${heading}</h1>
            <h1>${message}</h1>
        </body>
    </html>
`;

export {
  generateEmailTemplate,
  welcomeEmailTemplate,
  forgotPasswordTemplate,
  resetPasswordTemplate,
};
