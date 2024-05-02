
  function openPopup() {
    document.getElementById('contact-popup').style.display = 'block';
  }
  
  function closePopup() {
    document.getElementById('contact-popup').style.display = 'none';
  }
  
// Send Email
function sendEmail() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var phoneRegex = /^[0-9]{10}$/;

  if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number with 10 digits.");
      return;
  }

  // Fetch IP address and location
  fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
          var ipAddress = data.ip;

          fetch('https://ipapi.co/' + ipAddress + '/json/')
              .then(response => response.json())
              .then(locationData => {
                  var location = `${locationData.city}, ${locationData.region}, ${locationData.country_name}`;

                  // Admin Email
                  var adminEmailContent = `
                      <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
                          <h2 style="color: #333;">Enquiry for UDYANA</h2>
                          <p style="font-size: 16px; color: #666;">
                              <strong>Name:</strong> ${name}<br/>
                              <strong>Email:</strong> ${email}<br/>
                              <strong>Phone Number:</strong> ${phone}<br/>
                              <strong>IP Address:</strong> ${ipAddress}<br/>
                              <strong>Location:</strong> ${location}<br/>
                          </p>
                      </div>
                  `;

                  // Client Email
                  var clientEmailContent = `
                      <div style="background-color: #f2f2f2; padding: 20px; font-family: Arial, sans-serif;">
                          <h2 style="color: #333;">Thank You for Your Enquiry</h2>
                          <p style="font-size: 16px; color: #666;">
                              Thank you, ${name}, for reaching out to UDYANA. We have received your enquiry and will contact you soon.<br/>
                              Here are the details you provided:<br/>
                              <strong>Email:</strong> ${email}<br/>
                              <strong>Phone Number:</strong> ${phone}<br/>
                          </p>
                      </div>
                  `;

                  // Send Email to Admin
                  Email.send({
                      Host: "smtp.elasticemail.com",
                      Username: "promotionalrealestate@gmail.com",
                      Password: "7D34D9615EE769A77A06F00B1EB25BDF1F86",
                      To: 'ashishvaidya683@gmail.com',
                      From: "promotionalrealestate@gmail.com",
                      Subject: "Enquiry for UDYANA",
                      Body: adminEmailContent,
                  }).then(() => {
                      // Send Email to Client
                      Email.send({
                          Host: "smtp.elasticemail.com",
                          Username: "promotionalrealestate@gmail.com",
                          Password: "7D34D9615EE769A77A06F00B1EB25BDF1F86",
                          To: email,
                          From: "promotionalrealestate@gmail.com",
                          Subject: "Thank You for Your Enquiry",
                          Body: clientEmailContent,
                      }).then(() => {
                          document.getElementById('thankyou-content').style.display = 'block';
                          document.getElementById('form-content').style.display = 'none';
                      });
                  });
              });
      });
}



function toggleContent(heading) {
  const content = heading.nextElementSibling; /* Get the content to toggle */
  const icon = heading.querySelector("i"); /* Get the caret icon */

  if (content.style.display === "none" || content.style.display === "") {
      content.style.display = "block"; /* Show the content */
      icon.classList.add("rotated"); /* Rotate the caret icon */
  } else {
      content.style.display = "none"; /* Collapse the content */
      setTimeout(() => {
          content.style.display = "none"; /* Hide after transition */
      }, 300); /* Match the transition duration */
      icon.classList.remove("rotated"); /* Reset the caret icon */
  }
}


