"use strict";

//variables
var signUpButton = document.getElementById('signUpButton');
var editProfileSubmitButton = document.getElementById('profileSubmitButton');
var loginButton = document.getElementById('userNamePasswordLogin');
var profileLink = document.getElementById('profileLink');
var createUser = document.getElementById('submitButton');
var uploadDocument = document.getElementById('uploadDocumentLink')

var mainPage = document.getElementById('mainSitePage');
var mentorShareMenu = document.getElementById('mentorShareMenu');
var profilePage = document.getElementById('mentorShareMenu');
var profileEditPage = document.getElementById('profileManagementPage');
var userName = document.getElementById('userNameTextBoxEdit');

//event listeners
signUpButton.addEventListener('click', displaySignUp);
loginButton.addEventListener('click', checkUsernamePassword);
profileLink.addEventListener('click', displayProfileManagementPage);
editProfileSubmitButton.addEventListener('click', editProfileFunction);
createUser.addEventListener('click', createUserProfile);
uploadDocument.addEventListener('click', displayUploadDocumentPage);

//***************************** Display Home page ******************************************************
function displayHomePage()
{
    checkUsernamePassword();
}

//******************************* Display Profile Management Page **************************************
function displayProfileManagementPage(){
    mentorShareMenu.style.display = 'none';
    profileEditPage.style.display = 'block';
    profileResultsPopulated();
}

//******************************** Display Sign Up Page **************************************************
function displaySignUp(){
    var mainPage = document.getElementById('mainSitePage');
    var signUpPage = document.getElementById('signUpPage');

    mainPage.style.display = 'none';
    signUpPage.style.display = 'block';
}

//******************************** Display Upload Document Page **************************************************
function displayUploadDocumentPage(){
    
    var documentUploadPage = document.getElementById('documentUploadPage');

    mentorShareMenu.style.display = 'none';
    documentUploadPage.style.display = 'block';
}

//*****************************     Sign Up Function           *****************************************
/*function signUpFunction()
{
    var insertStatement = "Insert into CinderUser (UserName, FirstName, LastName, PhoneNumber, Email, UserPassword, Major, Gender) Values ('";
    var addApostrophe = "'";
    var addApostropheCommaApostrophe = "','";
    var closingBrace = "');";
    var userNameTbx = document.getElementById("userNameTextBox").value;
    var firstNameTbx = document.getElementById("firstNameTextBox").value;
    var lastNameTbx = document.getElementById("lastNameTextBox").value;
    var mobileNumberTbx = document.getElementById("mobileNumberTextBox").value;
    var emailTbx = document.getElementById("emailTextBox").value;
    var passwordTbx = document.getElementById("passwordValue").value;
    var majorTbx = document.getElementById("majorVal").value;
    var genderTbx;
    if (document.getElementById("genderMale").checked == true)
    {
    genderTbx = document.getElementById("genderMale").value;
    }
    else
    {
    genderTbx = document.getElementById("genderFemale").value; 
    }
    MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                             // database name
        insertStatement.concat(userNameTbx.concat(addApostropheCommaApostrophe.concat(firstNameTbx.concat(addApostropheCommaApostrophe.concat(lastNameTbx.concat(addApostropheCommaApostrophe.concat(mobileNumberTbx.concat(addApostropheCommaApostrophe.concat(emailTbx.concat(addApostropheCommaApostrophe.concat(passwordTbx.concat(addApostropheCommaApostrophe.concat(majorTbx.concat(addApostropheCommaApostrophe.concat(genderTbx.concat(closingBrace)))))))))))))))),
        function (data) {
        document.getElementById("signUpOutput").innerHTML = JSON.stringify(data,null,2);
        });
    /*welcomeUserLabel.innerHTML = document.getElementById('userNameTextBox').value;
    welcomeUserLabel.value = document.getElementById('userNameTextBox').value;
    nameIdGoingLabel.innerHTML = document.getElementById('userNameTextBox').value;
    nameIdGoingLabel.value = document.getElementById('userNameTextBox').value;

}
*/

//*****************************     LoginFunction           *****************************************
function checkUsernamePassword()
{
    var start = "Select Exists ( Select * from MentorShareUser Where UserName = '";
    var username = document.getElementById("userNameLoginId").value;
    var andPassword = "' and UserPassword = '";
    var password = document.getElementById("passwordLoginId").value;
    var endTag = "')";


    MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                             // database name
        start.concat(username.concat(andPassword.concat(password.concat(endTag)))),
        function (data) {
        if (JSON.stringify(data).lastIndexOf("1") == (JSON.stringify(data).length-4))
        {
            mainPage.style.display = 'none';
            profilePage.style.display = 'block';
            userName.innerHTML = document.getElementById('userNameLoginId').value;
        }
        else
        {
            //alert("Incorrect username or password. Please try again");
            document.getElementById("signUpOutput").innerHTML = "Incorrect UserName and Password";
        }
        
        });
}

//***************************** SQL Database information *****************************
function showDatabase()
{
    MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                             // database name
        "select * from MentorShareUser;",
        function (data) {
        document.getElementById("signUpOutput").innerHTML = JSON.stringify(data,null,2);
        });
}


//*********************************** Edit Profile Function ********************************************
function editProfileFunction()
{

    var userNameTbx = userName.innerHTML;

    var firstNameTbx = document.getElementById("firstNameTextBoxEdit").value;
    var lastNameTbx = document.getElementById("lastNameTextBoxEdit").value;
    var jobTitleTbx = document.getElementById("jobTitleTextBoxEdit").value;
    var emailTbx = document.getElementById("emailTextBoxEdit").value;
    var passwordTbx = document.getElementById("passwordEdit").value;
    var confirmPassword = document.getElementById('confirmPasswordEdit').value;
    //var majorTbx = document.getElementById("majorEdit").value;
    //var genderTbx;


    if (firstNameTbx != "" && lastNameTbx != "" && jobTitleTbx != "" && emailTbx != "" && passwordTbx != "") 
    {
        if (passwordTbx == confirmPassword) 
        {
        var insertStatement = "Update MentorShareUser Set FirstName = '";
        var addApostrophe = "'";
        var comma = ",";
        var addApostropheCommaApostrophe = "','";
        var closing = "';";
        var lastNameChange = "',LastName = '";
        var jobTitleChange = "',JobTitle = '";
        var emailChange = "',Email = '";
        var passwordChange = "',UserPassword = '";
        //var majorChange = "',Major = '";
        //var genderChange = "',Gender = '";
        var userNameChange = "' Where UserName = '"

        MySql.Execute(
            "sql3.freemysqlhosting.net",              // mySQL server
            "sql3258453",                             // login name
            "3FtHyAYBuU",                             // login password
            "sql3258453",                             // database name
            insertStatement.concat(firstNameTbx.concat(lastNameChange.concat(lastNameTbx.concat(jobTitleChange.concat(jobTitleTbx.concat(emailChange.concat(emailTbx.concat(passwordChange.concat(passwordTbx.concat(userNameChange.concat(userNameTbx.concat(closing)))))))))))),
            function (data) {
            //document.getElementById("editUserInfoOutput").innerHTML = JSON.stringify(data,null,2);
            });
            clearProfileDataTable();
            profileResultsPopulated();
            alert("Profile information successfully edited! Please click OK.");

        }
        else{
            alert("Password must match confirm password");
        }
    }
    else{
        alert("Please fill out all fields");
    }
}

//****************************** Clear Data Tables *****************************************
function clearProfileDataTable(){
        var profileTableResults = document.getElementById('profileDatabaseInformation');
        profileTableResults.innerHTML = "";
    }

//*********************************************** Profile Information Table *************************************
 function profileResultsPopulated(){
//var selectStatement = "Select UserName, FirstName, LastName, JobTitle, Email, UserPassword, FROM MentorShareUser WHERE UserName = '";
var selectStatement = "Select UserName, FirstName, LastName, JobTitle, Email, UserPassword FROM MentorShareUser WHERE UserName = '"
var addApostrophe = "'";
var userNameVal = userName.innerHTML;

//userForm.style.display = 'block';
MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                                     // database to use
                                                            // SQL query string
            selectStatement.concat(userNameVal).concat(addApostrophe),
            function (data) {
                processProfileQueryResult(data);
            }
        );

//runs preset queryResult function to create a table and insert query values

        function processProfileQueryResult(queryReturned) {
            //clearData();
            //tableHeaders.style.display = 'block';
            if (!queryReturned.Success) {
                alert(queryReturned.Error)
            } else {

                var table, tableBody, tableHeader, tableRow;
                var rows = queryReturned.length;

                var body        = document.getElementById("profileInformationDiv");
                table       = document.getElementById("profileDatabaseInformation");
                tableBody   = document.createElement("tbody");
                tableHeader = document.createElement("tr");

                for (var i=0; i<queryReturned.Result[0].length; i++) {
                    var cell     = document.createElement("th");
                    var cellText = document.createTextNode(queryReturned.Result[0].keys()[i]);
                    cell.appendChild(cellText);
                    tableHeader.appendChild(cell);
                }
                tableBody.appendChild(tableHeader);

                for (var i=0; i<queryReturned.Result.length; i++) {
                    var tableRow = document.createElement("tr");

                    for (var j=0; j<Object.keys(queryReturned.Result[i]).length; j++) {
                        var cell     = document.createElement("td");
                        var cellText = document.createTextNode(Object.values(queryReturned.Result[i])[j]);
                        cell.style.width = '5%';
                        cell.appendChild(cellText);
                        tableRow.appendChild(cell);
                    }

                    tableBody.appendChild(tableRow);
                }//cell.style.width = 20%;

                table.setAttribute("padding-right", "10");
                table.appendChild(tableBody);
                table.setAttribute("border", "3");
                table.style.borderCollapse="collapse";
                body.appendChild(table);
            }
        }

    }

function createUserProfile()
{
    //Variables
    var insertStatement = "insert into MentorShareUser(UserName, FirstName, LastName, Email, UserPassword, JobTitle, Points, ArticlesCreated, ArticlesUsed) Values ('";
    var username = document.getElementById("userNameTextBox").value;
    var firstName = document.getElementById("firstNameTextBox").value;
    var lastName = document.getElementById("lastNameTextBox").value;
    var email = document.getElementById("emailTextBox").value;
    var password = document.getElementById("passwordValue").value;
    var jobTitle = document.getElementById("jobTitleValue").value;
    var endTag = "', '0', '0', '0');";
    var addApostropheCommaApostrophe = "', '";

    MySql.Execute(
    "sql3.freemysqlhosting.net",              // mySQL server
    "sql3258453",                             // login name
    "3FtHyAYBuU",                             // login password
    "sql3258453",                             // database to use
    insertStatement.concat(username.concat(addApostropheCommaApostrophe.concat(firstName.concat(addApostropheCommaApostrophe.concat(lastName.concat(addApostropheCommaApostrophe.concat(email.concat(addApostropheCommaApostrophe.concat(password.concat(addApostropheCommaApostrophe.concat(jobTitle.concat(endTag)))))))))))),
    function (data) {
    mainPage.style.display = 'none';
    profilePage.style.display = 'block';
    });
}
