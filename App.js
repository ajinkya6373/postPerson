console.log("10-04-2021");
// Initialize no of parameters
let addredParamsconut = 0;

// utility function 
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Hide the parameters box initially
let parametersBox = document.getElementById("parametersBox");
let requestJsonBox = document.getElementById("requestJsonBox");
parametersBox.style.display = "none"


// the user click on Custom Parameters hide json box and show parameter box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    requestJsonBox.style.display = "none"
    parametersBox.style.display = "block"

})


// if user click on json box then hide parameters box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    requestJsonBox.style.display = "block";
    parametersBox.style.display = "none"

})



// if the user clicks on + add more paramerets
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", (e) => {
    e.preventDefault();
    let params = document.getElementById("params");
    let string = `<form class=" row g-3 my-2">
                <label for="url" class="col-sm-2 col-form-label">Parameter ${addredParamsconut + 2}</label>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterKey${addredParamsconut + 2}" placeholder="Enter key ${addredParamsconut + 2}">
                </div>
                <div class="col-md-4">
                    <input type="text" class="form-control" id="parameterValue${addredParamsconut + 2}" placeholder="Enter value of a key ${addredParamsconut + 2}">
                </div>
                <div class="col-md-1">
                    <button class="btn btn-primary deleteParam"> - </button>
                </div>
            </form> `

    // Convert the element string to DOM node
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);
    addredParamsconut++;

    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            // console.log(e.target.parentElement.parentElement)
            e.target.parentElement.parentElement.remove();

        })
    }

})

// if the user click on submit button

let submit = document.getElementById("submit");
data = {}
submit.addEventListener('click', () => {
    let t0 = performance.now()
    // show please wait in the response box to request patience from user 
    document.getElementById("responsePrism").innerHTML = "please wait...fetching Response!";
    let t1 = performance.now()
    let executionTime = t1 - t0;
    // console.log("executionTime:",executionTime);

    Prism.highlightAll();

    // fetch all values user has entered 
    let url = document.getElementById("url").value;
    let requsetType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    // if user has used params option insted of json collect all the parameter in an object
    if (contentType == "customParams") {
        for (i = 0; i < addredParamsconut + 1; i++) {
            if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value;
                let value = document.getElementById("parameterValue" + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else {
      data = document.getElementById("requestJsonText").value;
    }
    // log all the value in the console for debugging
    console.log("URL is", url)
    console.log("requsetType is", requsetType)
    console.log("contentType is", contentType)
    console.log(data);

    // if the request is the GET, invok fetch api to create a GET reqest 

    if (url == "" || executionTime >= 10000) {
        document.getElementById("responsePrism").innerHTML = "Sorry Something wents wrong ! (Enter valid URL)";
        console.log("executionTime:", executionTime);
        Prism.highlightAll();

    }
    else {


        if (requsetType == "GET") {
            fetch(url, {
                method: 'GET'
            }).then((response) => {

                return response.text();

            }).then((data) => {

                document.getElementById("responsePrism").innerHTML = data;
                Prism.highlightAll();
                // console.log(data);
            })
        }
        else if (requsetType == "POST") {
            fetch(url, {
                method: 'POST',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => {
                    return response.text();
                }).then((data) => {

                    document.getElementById("responsePrism").innerHTML = data;
                    Prism.highlightAll();
                    // console.log(data);

                })

        }
        else if (requsetType == "PUT") {
            fetch(url, {
                method: 'PUT',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => {
                    return response.text();
                }).then((data) => {

                    document.getElementById("responsePrism").innerHTML = data;
                    Prism.highlightAll();
                    // console.log(data);

                })

        }
        else if (requsetType == "PATCH") {

            fetch(url, {
                method: 'PATCH',
                body: data,
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then((response) => {
                    return response.text();
                }).then((data) => {

                    document.getElementById("responsePrism").innerHTML = data;
                    Prism.highlightAll();
                    // console.log(data);

                })

        }
    }
    data = {}  // this will reset data after submiting for next call (in short = this will help to call next reqest without refershing the page)
})

