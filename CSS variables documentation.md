# CSS Variables Documentation for the Package

This package uses CSS variables to allow quick and easy customization of various layout and style aspects. You can modify these variables in your global CSS file to adapt the look of the site to your needs.

```css
  /* Primary color, company color */
  --color-primary: ; /* -> Primary color, company color */
  --color-primary-hover: ; /* -> Primary color on hover */
  --color-primary-text: ; /* -> Primary text color */
  --shadow-primary: ; /* -> Shadow of the primary color */
  --shadow-primary-hover: ; /* -> Shadow on primary color hover */
  --shadow-primary-active: ; /* -> Shadow on primary color active */
  --shadow-primary-input: ; /* -> Shadow on input form focus */
  --padding-primary-button: ; /* -> Padding of the login button */
  --margin-primary-button: ; /* -> Margin of the login button */
  --radius-primary-button: ; /* -> Border radius of the login button */
  --justify-primary: ; /* -> Position of the login button */

  /* Card form dimensions */
  --height-card-form: ; /* -> Height of the card containing the logo and form */
  --width-card-form: ; /* -> Width of the card containing the logo and form */
  --max-width-card-form: ; /* -> Maximum width of the card containing the logo and form */
  --border-form-size: ; /* -> Border size of the card containing the logo and form */
  --form-radius: ; /* -> Border radius of the card containing the logo and form */
  --text-input-label: ; /* -> Font size of input labels */
  --text-input-placeholder: ; /* -> Font size of input placeholders */
  --color-color-label: ; /* -> Text color of input labels */
  --label-display: ; /* -> Flag for input label visibility ('none' hides the label, 'block' shows it) */
  --padding-input: ; /* -> Input padding, useful for determining input size */
  --input-radius: ; /* -> Border radius of the input field */

  /* Card form color */
  --color-form: ; /* -> Background color of the card containing the logo and form */
  --color-form-border: ; /* -> Border color of the card and form */

  /* Input colors */
  --color-input-bg: ; /* -> Input background color */
  --color-input-border: ; /* -> Input border color */
  --color-input-text: ; /* -> Input text color */

  /* Form dimensions */
  --basis-form: ; /* -> Form width (basis) */
  --input-form-width: ; /* -> Width of form inputs */
  --margin-input-form: ; /* -> Margin between form inputs */
  
  /* Form title */
  --text-form-title-size: ; /* -> Form title font size */
  --margin-form-title: ; /* -> Form title margin */
  --title-display: ; /* -> Flag for title visibility ('none' hides it, 'block' shows it) */
  --title-position: ; /* -> Position of the title */

  /* Background image */
  --bg-image: ; /* -> Background image of the login section */

  /* Alert - Danger */
  --color-danger: ; /* -> Danger color */
  --color-danger-text: ; /* -> Danger text color */
  --color-danger-hover: ; /* -> Danger hover color */
  --color-danger-progress: ; /* -> Danger progress bar color */

  /* Alert - Info */
  --color-info: ; /* -> Info color */
  --color-info-text: ; /* -> Info text color */
  --color-info-hover: ; /* -> Info hover color */
  --color-info-progress: ; /* -> Info progress bar color */

  /* Alert - Success */
  --color-success: ; /* -> Success color */
  --color-success-text: ; /* -> Success text color */
  --color-success-hover: ; /* -> Success hover color */
  --color-success-progress: ; /* -> Success progress bar color */

  /* Alert - Warning */
  --color-warning: ; /* -> Warning color */
  --color-warning-text: ; /* -> Warning text color */
  --color-warning-hover: ; /* -> Warning hover color */
  --color-warning-progress: ; /* -> Warning progress bar color */

  /* Login Logo */
  --login-logo-width: ; /* -> Width of the login logo image */
  --login-logo-max-width: ; /* -> Maximum width of the login logo image */

  /* Loading Component */
  --color-loading-bg: ; /* -> Background color of the Loading component */
  --color-spinner: ; /* -> Spinner color in the Loading component */
```

## How to Use the Variables

You can modify the declared CSS variables to customize the appearance of your application. Here's how:

1. ### Import the package's CSS file:
Once the package is installed, you need to import the CSS file that contains the variables into your main stylesheet (typically styles.css or main.css).
Add the following line of code to your main CSS file (or a new one included in your project):
```css
@import url('../node_modules/thecore-auth/dist/thecore-auth.css');
```
This import ensures that all CSS variables from the package (such as colors, sizes, and styling properties) are loaded into your project, allowing you to easily customize them.

2. ### Modify the CSS variables:
After importing the package's CSS file, you can override the variables in your custom CSS file to adapt the package’s appearance to your needs. For example, you can change the primary color or the form dimensions by modifying the variables in your CSS file:
```css
:root {
  --color-primary: #ff5733; /* Change the primary color */
  --height-card-form: 60vh; /* Change the form card height */
}
```

3. ### Verify that the changes are applied:
Once the import is done and the variables are modified, your changes will be automatically applied to all parts of the package that use these variables. For example, colors, margins, and component dimensions will update without the need to modify the component code directly.

