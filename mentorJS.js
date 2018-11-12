"use strict";

//variables
var signUpButton = document.getElementById('signUpButton');
var editProfileSubmitButton = document.getElementById('profileSubmitButton');
var loginButton = document.getElementById('userNamePasswordLogin');
var viewDocumentsDashboardButton = document.getElementById('viewDocsDashboardButton');
var profileLink = document.getElementById('profileLink');
var tableuTablesLink = document.getElementById('tableuTablesLink');
var createUser = document.getElementById('submitButton');
var documentUploadPage = document.getElementById('documentUploadPage');
var deleteButton = document.getElementById('viewDocsDeleteArticleButton');
var uploadButton = document.getElementById('uploadButton');
var helpLink = document.getElementById('helpLink');

var uploadDocument = document.getElementById('uploadDocumentLink');
var viewDocuments = document.getElementById('viewDocumentsLink');
var idVal;
var fNameVal;
var lNameVal;

var userID;
var userFname;
var userLname;


var mainPage = document.getElementById('mainSitePage');
var mentorShareMenu = document.getElementById('mentorShareMenu');
var profilePage = document.getElementById('mentorShareMenu');
var profileEditPage = document.getElementById('profileManagementPage');
var userName = document.getElementById('userNameTextBoxEdit');
var viewDocumentsMenu = document.getElementById('viewDocumentsPage');
var tableuTablesPage = document.getElementById('tableuTable');
var helpLinkPage = document.getElementById('helpPage');

//event listeners
signUpButton.addEventListener('click', displaySignUp);
loginButton.addEventListener('click', checkUsernamePassword);
profileLink.addEventListener('click', displayProfileManagementPage);
editProfileSubmitButton.addEventListener('click', editProfileFunction);
createUser.addEventListener('click', createUserProfile);
tableuTablesLink.addEventListener('click', displayTableuTables);
helpLink.addEventListener('click', displayHelpPage);



uploadDocument.addEventListener('click', displayUploadDocumentPage);
viewDocuments.addEventListener('click', displayDocumentsPage);
viewDocumentsDashboardButton.addEventListener('click', displayMainHomePage);
deleteButton.addEventListener('click', deleteArticle);
uploadButton.addEventListener('click', uploadArticle);


function displayTableuTables(){

    mentorShareMenu.style.display = 'none';
    tableuTablesPage.style.display = 'block';
}


//***************************** Display Home page post login ******************************************************
function displayHomePage()
{
    checkUsernamePassword();

}

//****************************** Display Home Page general use *********************************************
function displayMainHomePage()
{
    profilePage.style.display = 'block';
    profileEditPage.style.display = 'none';
    signUpPage.style.display = 'none';
    viewDocumentsMenu.style.display = 'none';
    documentUploadPage.style.display = 'none';
    profileResultsPopulated();
    
}
//******************************* Display Profile Management Page **************************************
function displayProfileManagementPage(){

    mentorShareMenu.style.display = 'none';
    profileEditPage.style.display = 'block';
    profileResultsPopulated();
}

//******************************* Display Help Page **************************************
function displayHelpPage(){
    

    mentorShareMenu.style.display = 'none';
    helpLinkPage.style.display = 'block';

}
//******************************** Display Sign Up Page **************************************************
function displaySignUp(){
    var mainPage = document.getElementById('mainSitePage');
    var signUpPage = document.getElementById('signUpPage');

    mainPage.style.display = 'none';
    signUpPage.style.display = 'block';
}
//****************************** Display View Documents Page ************************************************
function displayDocumentsPage(){
    mentorShareMenu.style.display = 'none';
    viewDocumentsMenu.style.display = 'block';
    populateDocumentsTable();
}

//******************************** Display Upload Document Page **************************************************
function displayUploadDocumentPage(){

    mentorShareMenu.style.display = 'none';
    documentUploadPage.style.display = 'block';
}

//*****************************     Populate Documents Function           *****************************************



function grabArticleData()
{

        var url;
        var img;
        var documentName;
        var authorName;
        var dateOfPublish;
        var numberOfPages; 
    var selectStatement = "Select CreatorFirstName, CreatorLastName, Genre, ArticleName, CreationDate, PageLength, ArticleUrl from MentorShareArticle Order by CreationDate"
    var userData = [1000,30];

    
    /*Things I need  
    <ul id="documentHolder" class="thumbnails">
    <li class="documentViewer" class="span4">
                <div class="thumbnail">
                  <img src="DocExample.png" alt="">
                  <div class="caption">
                    <h5>Tableau Analytics</h5>
                    <pre>Tom Jerry<br>10/23/2018<br>1 Page</pre>
                    <p><a href="#" class="btn btn-primary">Open</a> <a href="#" class="btn">Favorite</a></p>
                  </div>
                </div>
              </li> */



    //Switch to select image based on genre


    //test upload
   // $("#documentHolder").append('<li class="documentViewer" class="span4"> <div class="thumbnail"> <img src="DocExample.png" alt=""> <div class="caption"> <h5>Tableau Analytics</h5> <pre>Tom Jerry<br>10/23/2018<br>1 Page</pre> <p><a href="#" class="btn btn-primary">Open</a> <a href="#" class="btn">Favorite</a></p> </div> </div> </li>')
    //upload with variables (This is the final code, just waiting on SQL to populate variables)
    //$("#documentHolder").append('<li class="documentViewer" class="span4"> <div class="thumbnail"> <img src="DocExample.png" alt=""> <div class="caption"> <h5>'+ documentName +'</h5> <pre>'+ authorName +'<br>'+ dateOfPublish +'<br>'+ numberOfPages +'</pre> <p><a href="'+url+'" class="btn btn-primary">Open</a> <a href="#" class="btn">Favorite</a></p> </div> </div> </li>')



    MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                             // database to use
        selectStatement,                          // SQL query string
            function (data) {
                var getInfo = JSON.stringify(data);
                //alert(getInfo);

                for (var i = 0; i < 38; i++) {

                    
                    
                        userData[i,0] = getInfo.search("\":\"");
                        //alert(userData[0,0]);
                        userData[i,1] = getInfo.search("\",\"");
                        //alert(userData[0,1]);
                        userData[i,2] = getInfo.substring(userData[i,0]+3, userData[i,1]);//First Name
                        //alert(userData[i,2]);
                        userData[i,3] = getInfo.search("CreatorLastName\":\"");
                        //alert(userData[0,3]);
                        userData[i,4] = getInfo.search("\",\"Genre");
                        //alert(userData[0,4]);
                        userData[i,5] = getInfo.substring(userData[i,3]+18, userData[i,4]); //Last Name
                        //alert(userData[i,5]);
                        userData[i,6] = getInfo.search("Genre\":\"");
                        userData[i,7] = getInfo.search("\",\"ArticleName");
                        userData[i,8] = getInfo.substring(userData[i,6]+8, userData[i,7]); //Genre
                        //alert(userData[i,8]);
                        userData[i,9] = getInfo.search("ArticleName\":\"");
                        userData[i,10] = getInfo.search("\",\"CreationDate");
                        userData[i,11] = getInfo.substring(userData[i,9]+14, userData[i,10]); //Article Name
                        //alert(userData[i,11]);
                        userData[i,12] = getInfo.search("CreationDate\":\"");
                        userData[i,13] = getInfo.search("\",\"PageLength");
                        userData[i,14] = getInfo.substring(userData[i,12]+15, userData[i,13]); //Creation Date
                        //alert(userData[i,14]);
                        userData[i,15] = getInfo.search("PageLength\":\"");
                        userData[i,16] = getInfo.search("\",\"ArticleUrl");
                        userData[i,17] = getInfo.substring(userData[i,15]+13, userData[i,16]); // Page Length
                        //alert(userData[i,17]);
                        userData[i,18] = getInfo.search("ArticleUrl\":\"");
                        userData[i,19] = getInfo.search("\"\},\{");
                        userData[i,20] = getInfo.substring(userData[i,18]+13, userData[i,19]); //article URl
                        //alert(userData[i,20]);
                        userData[i,21] = getInfo.substring(userData[i,0]-21, userData[i,19]+3);

        //                 var url;
        // var img;
        // var documentName;
        // var authorName;
        // var dateOfPublish;
        // var numberOfPages; 
        authorName = userData[i,2] + " " + userData [i,5];
        documentName = userData[i,11];
        dateOfPublish = userData[i,14];
        numberOfPages = userData[i,17];
        url = userData[i,20];


        // alert(authorName);
        // alert(documentName);
        // alert(dateOfPublish);
        // alert(numberOfPages);
        // alert(url);




                            //alert(userData[i,21]);
                            var getInfo = getInfo.replace(userData[i,21], "");

                            //alert(getInfo);

                            //test upload
    //$("#documentHolder").append('<li class="documentViewer" class="span4"> <div class="thumbnail"> <img src="DocExample.png" alt=""> <div class="caption"> <h5>Tableau Analytics</h5> <pre>Tom Jerry<br>10/23/2018<br>1 Page</pre> <p><a href="#" class="btn btn-primary">Open</a> <a href="#" class="btn">Favorite</a></p> </div> </div> </li>')
    //upload with variables (This is the final code, just waiting on SQL to populate variables)
    $("#documentHolder").append('<li class="documentViewer" class="span4"> <div class="thumbnail"> <img src="DocExample.png" alt=""> <div class="caption"> <h5>'+ documentName +'</h5> <pre>'+ authorName +'<br>'+ dateOfPublish +'<br>'+ numberOfPages +'</pre> <p><a href="'+url+'" class="btn btn-primary">Open</a> <a href="http://corn-hub.blogspot.com/" class="btn">Favorite</a></p> </div> </div> </li>')

                }
               
            }
        );
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
            profileResultsPopulated();
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

//****************************** Clear Profile Data Tables *****************************************
function clearProfileDataTable(){
        var profileTableResults = document.getElementById('profileDatabaseInformation');
        //var viewDocumentsTableResults = document.getElementById('viewDocumentsTable');
        //var viewDocumentsDiv = document.getElementById('viewDocumentsDiv')
        profileTableResults.innerHTML = "";
        //viewDocumentsTableResults.innerHTML = "";
        //viewDocumentsDiv.innerHTML = "";
    }
function clearViewDocumentsTable(){
        var viewDocumentsTableResults = document.getElementById('viewDocumentsTable');
        var viewDocumentsDiv = document.getElementById('viewDocumentsDiv');
        //profileTableResults.innerHTML = "";
        viewDocumentsTableResults.innerHTML = "";
        //viewDocumentsDiv.innerHTML = "";
}

//*********************************************** Profile Information Table *************************************
 function profileResultsPopulated(){
//var selectStatement = "Select UserName, FirstName, LastName, JobTitle, Email, UserPassword, FROM MentorShareUser WHERE UserName = '";
var selectStatement = "Select UserId, UserName, FirstName, LastName, JobTitle, Email, UserPassword FROM MentorShareUser WHERE UserName = '"
var addApostrophe = "'";
var userNameVal = userName.innerHTML;
clearProfileDataTable();
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
                var arrayValues = [5];

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
                        //UserName = cellText.innerHTML;
                        
                        cell.style.width = '5%';
                        cell.appendChild(cellText);
                        tableRow.appendChild(cell);
                        //alert(cell.innerHTML);
                        arrayValues.push(cell.innerHTML);
                        
                    }

                    tableBody.appendChild(tableRow);
                }//cell.style.width = 20%;

                document.getElementById('idLabelValue').innerHTML = arrayValues[1];
                document.getElementById('fNameLabelValue').innerHTML = arrayValues[3];
                document.getElementById('lNameLabelValue').innerHTML = arrayValues[4];

                var idVal = document.getElementById("idLabelValue").innerHTML;
                var fNameVal = document.getElementById("fNameLabelValue").innerHTML;
                var lNameVal = document.getElementById("lNameLabelValue").innerHTML;

                table.setAttribute("padding-right", "10");
                table.appendChild(tableBody);
                table.setAttribute("border", "3");
                table.style.borderCollapse="collapse";
                
                body.appendChild(table);
            }
        }
    }
//************************************** Create User Profile *************************************************
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
    //mainPage.style.display = 'none';
    //profilePage.style.display = 'block';
    displayMainHomePage();
    });
}


//************************************* View Documents Table *********************************************************
function populateDocumentsTable(){
    var selectStatement = "Select * from MentorShareArticle"
    var addApostrophe = "'";
    //var userNameVal = userName.innerHTML;

//userForm.style.display = 'block';
MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                                     // database to use
                                                            // SQL query string
            selectStatement,
            function (data) {
                processProfileQueryResult(data);
            }
        );

//runs preset queryResult function to create a table and insert query values

        function processProfileQueryResult(queryReturned) {
            debugger;
            clearViewDocumentsTable();
            //tableHeaders.style.display = 'block';
            if (!queryReturned.Success) {
                alert(queryReturned.Error)
            } else {

                var table, tableBody, tableHeader, tableRow;
                var rows = queryReturned.length;

                var body        = document.getElementById("viewDocumentsDiv");
                table       = document.getElementById("viewDocumentsTable");
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

//Removes an article the user specifies
function deleteArticle()
{
    var deleteStatement = "Delete from MentorShareArticle Where ArticleId = '";
    var articleNumber = document.getElementById("articleIdToDelete").value;
    var endTag = "';"

    MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                                     // database to use
                                                            // SQL query string
            deleteStatement.concat(articleNumber.concat(endTag)),
            function (data) {
                deleteResult.innerHTML = "Article " + articleNumber + " has been deleted.";
                populateDocumentsTable();
            }
        );
}

//Upload article by grabbing user data and the information they fill in
function uploadArticle()
{
    //Call this function to grab user info
    //profileResultsPopulated();
    debugger;
    var selectStatement = "Insert into MentorShareArticle (CreatorId, CreatorFirstName, CreatorLastName, CreationDate, TimesShared, Genre, ArticleName, ArticleUrl, PageLength) Values ('";
    var addApostropheCommaApostrophe = "','";
    var currentdate = new Date(); 
    var dateTime = currentdate.getFullYear() + "-"
            + (currentdate.getMonth()+1)  + "-" 
            + currentdate.getDate() + " "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
    //var datetime = "2018-11-07 12:31:00"
    var timesShared = "0";
    var endTag = "');";
    var genreValue = document.getElementById("genreSelectBox").value;
    var titleValue = document.getElementById("articleTitleTextBox").value;
    var urlValue = document.getElementById("documentURLTextBox").value;
    var pageValue = document.getElementById("pageNumberTextBox").value;
    var id = document.getElementById("idLabelValue").innerHTML;
    var fVal = document.getElementById("fNameLabelValue").innerHTML;
    var lVal = document.getElementById("lNameLabelValue").innerHTML;

    alert(id);
    alert(dateTime);

    MySql.Execute(
        "sql3.freemysqlhosting.net",              // mySQL server
        "sql3258453",                             // login name
        "3FtHyAYBuU",                             // login password
        "sql3258453",                                     // database to use
                                                            // SQL query string
            selectStatement.concat(id.concat(addApostropheCommaApostrophe.concat(fVal.concat(addApostropheCommaApostrophe.concat(lVal.concat(addApostropheCommaApostrophe.concat(dateTime.concat(addApostropheCommaApostrophe.concat(timesShared.concat(addApostropheCommaApostrophe.concat(genreValue.concat(addApostropheCommaApostrophe.concat(titleValue.concat(addApostropheCommaApostrophe.concat(urlValue.concat(addApostropheCommaApostrophe.concat(pageValue.concat(endTag)))))))))))))))))),
            function (data) {
                document.getElementById("sqlOutput").innerHTML = JSON.stringify(data,null,2);
            }
        );
}

//

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
};

//var date = new Date();
