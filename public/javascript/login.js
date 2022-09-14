async function loginFormHandler(event) {
  event.preventDefault();

  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    
    const obj = await response.json();
    console.log("RESPONSE" + JSON.stringify(obj));
    console.log("RESPONSE" + JSON.stringify(response));

    if (response.ok) {
      document.location.replace("/blog/");
    } else {
      alert(response.statusText);
      console.log(response.statusText);
    }
  } else {
    alert("Fill in the form!");
  }
}

document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
