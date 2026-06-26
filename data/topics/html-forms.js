export const htmlFormsContent = {
  slug: "html-forms",
  briefDescription: [
    "HTML forms are the primary way users send data to a server. The <form> element wraps all inputs and has two key attributes: action (the URL where data is sent) and method (GET or POST). GET appends data to the URL as query strings — good for search forms. POST sends data in the request body — required for passwords, file uploads, or any sensitive data. Every input needs a name attribute so the server can identify the field.",
    "HTML5 introduced a wide range of input types beyond the basic text field: email (validates email format), password (masks characters), number (shows numeric keyboard), date (shows date picker), checkbox (true/false toggle), radio (one choice from a group), file (opens file browser), range (slider), color (color picker), tel (phone number), and url (validates URL format). The browser handles validation for most of these automatically when you submit the form.",
    "Form accessibility relies on properly associating labels with inputs using the for attribute on <label> matching the id on the input. The required attribute marks fields as mandatory. The placeholder attribute shows hint text inside an empty field. For styling, use CSS pseudo-classes like :focus, :valid, :invalid, and :required. Fieldsets group related inputs and the legend provides a group caption, which is especially important for radio button groups.",
  ],
  keyConcepts: [
    "<form action='' method=''>: Container — action=URL, method=GET or POST",
    "<input type='text|email|password|number|date|checkbox|radio|file|range|color|tel'>",
    "<label for='inputId'>: Associates label with input for accessibility",
    "name attribute: Required on all inputs — identifies the field when submitted",
    "required attribute: Marks a field as mandatory before form can be submitted",
    "placeholder attribute: Shows hint text inside an empty input field",
    "<textarea rows='' cols=''>: Multi-line text input",
    "<select> + <option>: Dropdown list; use <optgroup> to group options",
    "<button type='submit|reset|button'>: Submit the form, reset fields, or custom action",
    "<fieldset> + <legend>: Groups related inputs with a visible label (essential for radio groups)",
    "enctype='multipart/form-data': Required on forms that upload files",
    "Form CSS pseudo-classes: :focus, :valid, :invalid, :required, :checked",
  ],
  codeExample: {
    language: "html",
    title: "Complete Registration Form with Validation and Accessibility",
    code: `<form action="/register" method="POST" enctype="multipart/form-data">

  <!-- Text inputs with labels -->
  <div>
    <label for="fullname">Full Name *</label>
    <input type="text" id="fullname" name="fullname" placeholder="John Doe" required />
  </div>

  <div>
    <label for="email">Email Address *</label>
    <input type="email" id="email" name="email" placeholder="you@example.com" required />
  </div>

  <div>
    <label for="password">Password *</label>
    <input type="password" id="password" name="password" minlength="8" required />
  </div>

  <div>
    <label for="age">Age</label>
    <input type="number" id="age" name="age" min="18" max="120" />
  </div>

  <div>
    <label for="dob">Date of Birth</label>
    <input type="date" id="dob" name="dob" />
  </div>

  <!-- Radio buttons need fieldset + legend -->
  <fieldset>
    <legend>Gender</legend>
    <label><input type="radio" name="gender" value="male" /> Male</label>
    <label><input type="radio" name="gender" value="female" /> Female</label>
    <label><input type="radio" name="gender" value="other" /> Other</label>
  </fieldset>

  <!-- Dropdown select -->
  <div>
    <label for="country">Country</label>
    <select id="country" name="country">
      <optgroup label="Asia">
        <option value="pk">Pakistan</option>
        <option value="in">India</option>
      </optgroup>
      <optgroup label="Europe">
        <option value="uk">United Kingdom</option>
      </optgroup>
    </select>
  </div>

  <!-- Textarea -->
  <div>
    <label for="bio">Bio</label>
    <textarea id="bio" name="bio" rows="4" placeholder="Tell us about yourself..."></textarea>
  </div>

  <!-- File upload -->
  <div>
    <label for="avatar">Profile Picture</label>
    <input type="file" id="avatar" name="avatar" accept="image/*" />
  </div>

  <!-- Checkbox -->
  <div>
    <label>
      <input type="checkbox" name="terms" value="agreed" required />
      I agree to the Terms and Conditions
    </label>
  </div>

  <!-- Buttons -->
  <button type="submit">Create Account</button>
  <button type="reset">Clear Form</button>

</form>`,
  },
}
