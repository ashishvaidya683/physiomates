
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
                      To: 'admin@physiomates.com.au',
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

function showTab(tabId) {
    // Hide all tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Remove 'active' class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the selected tab content and set the tab as active
    document.getElementById(tabId).classList.add('active');
    event.target.classList.add('active');
}