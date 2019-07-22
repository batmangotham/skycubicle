$(document).ready(function() {
  let type ="";
  const student = [
    { name: "fullName", required: true, display: "Full name", type: "text" },
    { name: "email", required: true, display: "Email address", type: "email" },
    { name: "mobile", required: true, display: "Mobile number", type: "text" },
    {
      name: "stream",
      required: true,
      display: "Select stream",
      type: "select",
      options: ["option1", "option2"]
    }
  ];
const working = JSON.parse(JSON.stringify(student));
working[3].options = ['job1','job2'];
  const data = {
    STUDENT: student,
    WORKING: working
  };
  // $(document).imagesLoaded(function() {
  //   // $(".pre-loader").fadeOut(1000);
  // });
  $(".ans-block").click(function() {
    type = $(this).attr("aType");
    if( $('.ans-block.active')){
    $('.ans-block.active').removeClass('active')      
    }
    $(this).addClass('active');
    removeForm();
    if (type) {
      let forms = data[type].map((form, i) => {
        if (form.type === "select") {
          const options = [
            ...form.options.map(op => `<option value=${op}>${op}</option>`),
            `<option value="" selected disabled>Select Your Stream</option>`
          ].join("");
          // console.log(options);
          return ` <div class="col-6"> 
          <select name=${form.name} class="form-control" ${form.required ? "required" : null} >
            ${options}
            </select>
          </div>`;
        } else {
          return ` <div class="${i < 2 ? "col-6 mb-3" : "col-6"}">
          <input ${!i ? "autofocus" : ""} ${
            form.required ? "required" : null
          } name=${form.name} type=${
            form.type
          } class="form-control" placeholder="${form.display}">
        </div>`;
        }
      });
      const submit = ` <div class="col text-right mt-3">
      <button id="submit" class="btn btn-primary pb-1 pt-1" type="submit">Submit</button>
  </div>`;
      forms = `<div class="row">${[...forms, ...submit].join("")}</div>`;
      // console.log(forms);
      $("#sub-form").append(forms);
    }
  });

  $("#subscribe").on("hidden.bs.modal", function(e) {
    removeForm();
  });

  function removeForm() {
    if ($("#sub-form .row")) {
      $("#sub-form .row").remove();
    }
  }


  $("body").on("click","#submit",function(ev){
      ev.preventDefault();
      const form = document.forms[0];
      const stream = form['stream']
      if(!stream.value){
        stream.setCustomValidity("Select an option from the list")
      }else
      {
        stream.setCustomValidity("")
      }
      form.reportValidity();
      if(form.checkValidity()){
        console.log($(form).serializeArray());
      }
  })

});
