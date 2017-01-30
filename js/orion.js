// JavaScript Document

	//frankie
var $investigationForm = $('#investigation-details-form');
var $noteList = $('#note-list');
var $noteText = $('#note-text');
var $CaseIdText = $('#CaseId-Text');
var $TitleText = $('#Title-Text');
var $StatusText = $('#Status-Text');
var $Deletebtn = $('#Delete-btn');
var $Deletebtn = $('#Delete-btn');

var $Closebtn = $('#Close-btn');

$investigationForm.on('click', '#add-note', function(E){
	E.preventDefault();
	E.stopPropagation();
  var content = $noteText.val();
  $noteList.append('<li>'+ 'Jan 27,2017 By UserName: ' +content+'</li>');
  $noteText.val('');
   
});

$investigationForm.on('click','#Hold-btn',function(){
                      alert('Status Changed to Hold');
                      });

$investigationForm.on('click','#Delete-btn',function()
                {
                    var caseid = $CaseIdText.val()
                    if($CaseIdText.val() !='')
                    {
                            alert('Unable to delete investigations with a case number');
                    }
                    else 
                    {
                      var ret =  confirm('Are you sure you want to delete this Investigation?');
                      if (ret)
                        {
                          
                            $StatusText.val('');
                            $TitleText.val('');
                            $noteText.val('');
                            $noteList.empty();
                          
                        }
                    }
                    
                  });


$investigationForm.on('click','#Close-btn',function(){
                      alert('Status Changed to Close');
                      });
	

	//chris
	var indicator = {
  saveInterval: 15000,
  saveProgressDelay: 2000,
  saveSuccessDelay: 3500,
  start: function() {
    var self = this;
    self.interval = setInterval(function() {
      self.save();
    }, this.saveInterval);
  },
  clear: function() {
    var date = new Date();
    this.$indicator.removeClass('alert-success');
    this.$indicator.addClass('alert-info');
    this.$indicator.html('Last saved ' + date);
  },
  saved: function() {
    this.$indicator.removeClass('alert-warning');
    this.$indicator.addClass('alert-success');
    this.$indicator.html('<i class="fa fa-check" /> Investigation saved!');
  },
  save: function() {
    var self = this;
    self.$indicator = $('#save-indicator');
    self.$indicator.show();
    self.$indicator.removeClass('alert-info');
    self.$indicator.addClass('alert-warning');
    self.$indicator.html('<i class="fa fa-spinner fa-pulse fa-fw" /> Saving investigation...');

    var saveTimer = setTimeout(function() {
      self.saved();
    }, self.saveProgressDelay);

    var clearTimer = setTimeout(function() {
      self.clear();
    }, self.saveSuccessDelay)
  }
};

$(document).ready(function() {
  indicator.start();
});
	
	//chris results
	$('body').on('click', 'table.survey-results .expand', function(e){
  var $target = $(e.currentTarget);
  var $tr = $target.closest('tr');
var $trbody = $target.closest('tbody');
  var surveyId = $tr.data('id');
  var $details = $('#survey-details-' + surveyId,$trbody);
  $details.toggle();
});

$(document).ready(function() {
  var surveyList = generateSurveyList(fakeData);
  var surveyList2 = generateSurveyList(fakeData);
	$('#test').replaceWith(surveyList);
	$('#test2').replaceWith(surveyList2);
	
});

var generateSurveyList = function(surveys) {
  var $output = $('<tbody></tbody>');
  
  for(var key in surveys) {
    $output.append(generateSurveyRow(surveys[key]));
  }
  
  return $output;
}
window.openProviderDetail = function() {
 newwindow=window.open('providerDetail.html','providerDetail','height=600,width=800');
 if (window.focus) {newwindow.focus()}
 return false;
}
var generateSurveyRow = function(survey) {
  var score = "";
  
  for(var i = 0; i < survey["Would Recommend Score"]; i++){
    score += '<i class="fa fa-star"></i>';
  }
  
  return $(`<tr id="survey-${survey.UserSurveyID}" data-id="${survey.UserSurveyID}">` +
  `      <td><input type="checkbox" value="${survey.UserSurveyID}" name="surveys[]" /></td>` +
  `      <td><a href="javascript:;" onclick="openProviderDetail()">${survey["PWID"]}</a></td>` +
  `      <td>${survey["Display Name"]}</td>` +
  `      <td>${survey["Email"]}</td>` +
  `      <td>${survey["Provider Name"]}</td>` +
  `      <td>${survey["Submit Date"]}</td>` +
  `      <td>${survey["Submitted IP Address"]}</td>` +
  `      <td>${survey["Confirm Date"]}</td>` +
  `      <td>${survey["Confirmed IP Address"]}` +
  `      <td>${survey["Phone"]}</td>` +
  `      <td>${survey["Current Survey Status"]}</td>` +
  `      <td>${!!survey["Suppressed"]}</td>` +
  `      <td><i style="cursor:pointer;" class="expand fa fa-caret-square-o-down" aria-hidden="true"></i></td>` +
  `    </tr>` +
  `    <tr style="display:none;" id="survey-details-${survey.UserSurveyID}">` +
  `      <td colspan="13">` +
  `        <div class="survey-details">` +
  `          <div class="row">` +
  `            <div class="col-xs-4">` +
  `              <dl>` +
  `                <dt>Survey ID</dt>` +
  `                <dd>${survey.UserSurveyID}</dd>` +
  `                <dt>Source Code</dt>` +
  `                <dd>${survey["Submission Source Code"]}</dd>` +
  `                <dt>Would Recommend Score</dt>` +
  `                <dd>${score}</dd>` +
  `              </dl>` +
  `               <div>` +
  `                 <button class="btn btn-danger" onclick="javascript:alert('suppresses the survey')">Suppress Entire Survey</button>`+
  `                 <button class="btn btn-info" onclick="javascript:alert('resends confirmation message to user')">Resend Confirmation</button>`+
  `               </div>`+
  `            </div>` +
  `            <div class="col-xs-4">` +
  `              <dl>` +
  `                <dt>Comment Status</dt>` +
  `                <dd>${survey["Current Comment Status"]}: ${survey["Rejection Reason"]}</dd>` +
  `                <dt>Comment Flag Count<dt>` +
  `                <dd>${survey["Comment Flag Count"]}</dd>` +
  `                <dt>Comment Sentiment</dt>` +
  `                <dd>${survey["Sentiment Type"]}: ${survey["Sentiment Score"]}</dd>` +
  `                <dt>Audited By</dt>` +
  `                <dd>${survey["Audited By"]}, ${survey["Most Recent Audit Date"]}</dd>` +
  `              </dl>` +
  `            </div>` +
  `            <div class="col-xs-4">` +
  `              <div class="media">` +
  `                <div class="media-body">` +
  `                  <h4 class="media-heading">User Comment</h4>` +
  `                  ${survey["Comment Text"]}` +
  `                  <div style="display: block" class="btn-group">` +
  `                    <button onclick="javascript:alert('approved comment');" type="button" class="approve btn btn-success">Approve</button>` +
  `                    <button type="button" onclick="javascript:alert('show reject reasons and reject comment');" class="btn btn-danger reject">Reject</button>` +
  `                  </div>` +
  `                </div>` +
  `              </div>` +
  `            </div>` +
  `          </div>` +
  `       </div>` +
  `      </td>` +
  `    </tr>`);
}



var fakeData = [

  {

    "PWID": "XMQ8P",

    "Display Name": "Kyle Keane",

    "Email": "kyle.keane@yahoo.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/16/2015",

    "Submitted IP Address": "198.243.35.1",

    "Confirm Date": "9/16/2015",

    "Confirmed IP Address": "198.243.35.1",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9480068",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "1",

    "Answer": "Poor",

    "Most Recent Audit Date": "9/16/2015",

    "Comment Text": "The worst doctor, only after money, no time to check patient, There is a note at the door, if patient is 15 minutes late then he has to pay $10, but everytime we go we have to wait for at least 1 hour and they don't even apologize, All the staff is extremely rude, Charges for getting sports forms signed or school forms signed, which also says to come in 2 or 3 days to pick up. Not at all recommended",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.578104",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=606540fa-4c6f-4ef2-95e9-e829a18f2121"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Marcela Lira",

    "Email": "mariiibabyy@yahoo.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/16/2015",

    "Submitted IP Address": "10.250.9.136",

    "Confirm Date": "9/18/2015",

    "Confirmed IP Address": "10.250.9.136",

    "Phone": "",

    "Current Survey Status": "Suppressed",

    "Suppressed": "MULTI",

    "UserSurveyID": "9480070",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/16/2015",

    "Comment Text": "Dr. Andalib is an amazing Chiro.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.2428952",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=7ba5d85a-8e18-4283-b95b-b002dea9a971"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Julia Gutierre",

    "Email": "jlgmac5651@gmail.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/16/2015",

    "Submitted IP Address": "10.250.9.137",

    "Confirm Date": "9/16/2015",

    "Confirmed IP Address": "10.250.9.137",

    "Phone": "",

    "Current Survey Status": "Suppressed",

    "Suppressed": "CUST",

    "UserSurveyID": "9480071",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/16/2015",

    "Comment Text": "She is Amazing. I was in a lot of pain and she was able to make my pain level go from a 10 to a 3. And still getting better. The staff displays Excellent Customer Service. I am very grateful to be a patient. My overall visit was Excellent. Thank you.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.6209944",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=0f4ae82f-6d83-4028-a6ce-1394af379e60"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Ryan",

    "Email": "ryanmiano@att.net",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.194",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.194",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9480078",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Excellent treatment, insight and patient education.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.7659194",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=66ecda00-b8b2-4e32-92a8-21884d949144"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Pat Thompson",

    "Email": "ryanmiano@att.net",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.194",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.194",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9480079",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Servais and Dr. Cox are the best there is hands down. Try finding somebody better. You probably won't. They are one very intelligent team. They will come up with a treatment plan for you and initiate it to perfection.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.2832943",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=77d052d8-eb8f-4eff-bf66-fea54de635f2"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Amberly Bell",

    "Email": "amb_bell@yahoo.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.66",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.66",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9480080",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "I have been going to LSM chiropractic for 10 years and have worked with a number of chiropractors. All of them have been exceptional. Dr. Smith, has helped me minimize my migraine headaches. He is personable and invested in my care.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.9091955",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=5c0d817a-5939-450e-8ff8-554f33c6b7be"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Dawn Quintos",

    "Email": "pipemajorbdq@msn.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "73.211.141.229",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "73.211.141.229",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9480082",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Lascola has a very  down to earth  personality.  He takes the time to listen and answer all your questions and concerns.  He never rushes you out of his office and I never have a problem scheduling my appointments.  I've never gone to a chiropracter before and I am very glad I was referred to him.  I finally feel I am getting the help I need  towards  relieving my back pain.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.3573617",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=048143ee-35a7-4ef9-8335-ece754ad1e25"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "",

    "Email": "Dmarucci@walsh.edu",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.66",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.66",

    "Phone": "3308443273",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486220",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "SMS",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Excellent chiropractor. Kind and compassionate. Excellent bedside manner",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.4188941",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=e5b66c60-a792-4b1a-9e3d-1f700808dac3"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Karen Hendrickson",

    "Email": "angelmoonwv@yahoo.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "98.142.49.41",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "98.142.49.41",

    "Phone": "9794728582",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486221",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "SMS",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Korzi is excellent. Very personable and caring. I would recommend her to everyone. Since I have moved out of the area. I can not find another chiropractor who compares. She is the best.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.26158",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=06e6c159-e403-411c-b9d2-fb4897c185e0"

  },

  {

    "PWID": "XMQ8P",

    "Display Name": "Belkis",

    "Email": "anabel1928@aol.com",

    "Provider Name": "Nimisha Shukla",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.194",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.194",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486223",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Great doctor, makes you feel very comfortable.  Love him!!",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.834382",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=8b58261f-8709-42de-80d6-1a0b1fbb65df"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Kim Benner",

    "Email": "Kclrgc@yahoo.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.66",

    "Confirm Date": "",

    "Confirmed IP Address": "10.248.9.66",

    "Phone": "3145043808",

    "Current Survey Status": "Pending",

    "Suppressed": "",

    "UserSurveyID": "9486227",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "",

    "Comment Text": "She is absolutely wonderful!  I have never been to a chiropractor before and was kinda of nervous.  She made all my fears go away.  Not to mention I was i terrible pain, my husband called and they were able to get me in that same day.  I would recommend her to anyone.  Her and her staff are so nice and wonderful!  Great experience!!",

    "Current Comment Status": "",

    "Suppressed Comment": "",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.5203964",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=1af67775-546d-4362-a694-799eb9f735ee"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Marcela Lira",

    "Email": "mariiibabyy@yahoo.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "75.166.54.105",

    "Confirm Date": "",

    "Confirmed IP Address": "75.166.54.105",

    "Phone": "",

    "Current Survey Status": "Pending",

    "Suppressed": "",

    "UserSurveyID": "9486229",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "",

    "Comment Text": "As a first time user of Chiropractic medicine, I have been very satisfied with Dr. Weeks approach. He is very knowledgable, personable and takes extra time to walk me thru the therapy, adjustments and exercises.  He is supporting and helping me navigate thru the healing process as well as dealing with the insurance side of things.  He is very attentive and he puts a great deal of energy into each visit and adjustment.  I would highly recommend Dr. Weeks for wellness and Chiropractic care.",

    "Current Comment Status": "",

    "Suppressed Comment": "",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.756144",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=3fdaeaa1-a955-423d-ac5e-7c3599248cfa"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Julia Gutierre",

    "Email": "jlgmac5651@gmail.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.194",

    "Confirm Date": "",

    "Confirmed IP Address": "10.248.9.194",

    "Phone": "4049885803",

    "Current Survey Status": "Pending",

    "Suppressed": "",

    "UserSurveyID": "9486232",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "",

    "Comment Text": "This man is so nice.  He listens, you won't feel rushed, if there are certain adjuments that you are not comfortable with he won't pressure you.  He has all of the state of the art tables and equipment to handle anything. His front desk secretary is very sweet.  I've gone to chriprators that never gave the attention to detail that he gave.",

    "Current Comment Status": "",

    "Suppressed Comment": "",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.9794392",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=dbad03df-5cef-43b2-814f-872f769d18aa"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Ryan",

    "Email": "ryanmiano@att.net",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.250.9.137",

    "Confirm Date": "",

    "Confirmed IP Address": "10.250.9.137",

    "Phone": "",

    "Current Survey Status": "Pending",

    "Suppressed": "",

    "UserSurveyID": "9486233",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "",

    "Comment Text": "Great Great Dr!!! He knows what he's doing just started going to him again for a different issue because he solved another issue I had ten years ago! He really truly cares about you as a patient and truly knows what's he doing!! I would never go any where else.",

    "Current Comment Status": "",

    "Suppressed Comment": "",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.4113297",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=3abf0bdd-e0c8-4fc7-8101-70c0eea3c61a"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Pat Thompson",

    "Email": "krok2712@gmail.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.250.9.137",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.250.9.137",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486234",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr Justin is awesome! He is very professional, friendly, and his knowledge of the nervous system and body function are exceptional! When I had lost all hope of gaining my life back from all my autoimmune and nervous system problems, he proved me wrong. I'm grateful to have worked with Dr Justin and for the hope and health he's helped me to regain! 5 ????? from this happy patient!",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.3330015",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=49be2c60-72ec-4877-8bed-5fd6354aaa5d"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Amberly Bell",

    "Email": "amb_bell@yahoo.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "68.68.34.34",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "68.68.34.34",

    "Phone": "",

    "Current Survey Status": "Suppressed",

    "Suppressed": "MULTI",

    "UserSurveyID": "9486236",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Auto",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "I began seeing Dr. Gertner 6 years ago when my broken ankle meant I had to be on crutches for a month which was causing pain from misalignment. Note only did I experience a great improvement there, but ongoing back pain from childhood began to resolve. I had a number of very jolting accidents as a child, and the pain in my lower back was a resulting chronic condition. It is a blessing. I continue to see Dr. Gertner regularly to help maintain my health and wellbeing.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.6165615",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=3df294c6-cffd-42c8-95cc-a51bbf16d914"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Dawn Quintos",

    "Email": "pipemajorbdq@msn.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "68.68.34.34",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "68.68.34.34",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486237",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Auto",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "I began seeing Dr. Gertner 6 years ago when my broken ankle meant I had to be on crutches for a month which was causing pain from misalignment. Note only did I experience a great improvement there, but ongoing back pain from childhood began to resolve. I had a number of very jolting accidents as a child, and the pain in my lower back was a resulting chronic condition. It is a blessing. I continue to see Dr. Gertner regularly to help maintain my health and wellbeing.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.1200278",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=b29f98d7-7344-4a48-9fd1-ea03e36233d6"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "",

    "Email": "Dmarucci@walsh.edu",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.66",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.66",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486238",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Very caring about his patients and accommodating. Highly recommend him!",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.8722165",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=0ae3d90d-2eac-4483-915e-81bb9e28ac9e"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Karen Hendrickson",

    "Email": "angelmoonwv@yahoo.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "50.149.250.156",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "50.149.250.156",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486239",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "I had numbness and tingling in my back. It hurt all the time. He got my pain level where I could manage to do my everyday chores. I had 13 pinched nerves in my back, and degenerative disease in my bones. I highly recommend him.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.8998309",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=1952784c-88ee-4805-878b-6e430d7f44fb"

  },

  {

    "PWID": "Y8B4M",

    "Display Name": "Belkis",

    "Email": "anabel1928@aol.com",

    "Provider Name": "Michael Porter",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.66",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.66",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486240",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Lisezewski is awesome!  He really takes the time to listen to you and get to the root of the casue.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.2312474",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=3d54b591-e0ec-4910-bb46-e632a04ce61b"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Kim Benner",

    "Email": "Kclrgc1@yahoo.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "208.70.233.40",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "208.70.233.40",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486247",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Carter is a very compassionate and kind physician who is dedicated to restoring and maintain good health. She is always friendly, happy and never keeps patients waiting.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.2807902",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=94676b7e-a7f8-430b-92b8-d7f0de150beb"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Grape007",

    "Email": "Kclrgc2@yahoo.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "24.16.138.50",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "24.16.138.50",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486248",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Amazing Doctor.  He has been able to fix chronic back pain that has plagued me for 20 years and no other doctor has been able to help.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.9641868",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=770a9b01-417d-40bd-b42c-dbfc95f32ade"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "",

    "Email": "Kclrgc3@yahoo.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "75.103.5.182",

    "Confirm Date": "9/18/2015",

    "Confirmed IP Address": "75.103.5.182",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486250",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "She took the time to discovery what really hurt. We worked on those issues.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.4034472",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=7cf5c630-8c32-47e2-90a2-827986038e2c"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Julie Shelton",

    "Email": "Vakkarsalons@yahoo.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "184.156.176.226",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "184.156.176.226",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486253",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Excellent, no nonsense, chiropractic doctor.  He was able to get me out of pain with my first appointment.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.5913817",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=fd249845-6a6e-4df5-a7d9-9f28b2c2b266"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Michele Christensen",

    "Email": "Mich_chrs@hotmail.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "12.7.42.5",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "12.7.42.5",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486254",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Can't express enough praise for Dr. Kennedy and his staff.  He is always the first course of treatment for me.",

    "Current Comment Status": "Rejected",

    "Suppressed Comment": "Y",

    "Suppressed Date": "9/17/2015",

    "Comment Flag Count": "1",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "1",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.9578214",

    "Rejection Reason": "Survey Investigator",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=03e5a2d1-69de-406f-9335-087c566cb9d2"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Fiona",

    "Email": "hodgsonfiona@yahoo.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "108.78.144.217",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "108.78.144.217",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486255",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Pai has really been kind to me. He helped me to get the help I needed.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.0309479",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=a65d3c08-a708-4c7f-8791-1709989445ce"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Fiona",

    "Email": "hodgsonfiona@yahoo.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "10.248.9.194",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "10.248.9.194",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486256",

    "Audited By": "jfields",

    "Submission Source Code": "HGMOBILEWEB",

    "Confirmation Method": "Email",

    "Would Recommend Score": "1",

    "Answer": "Poor",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "I feel better already and I know he will make me feel even better as I continue to see him.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.8130146",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=81a0da50-fb38-4cfa-ad86-7605f0ccdea3"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Naomi",

    "Email": "Naomilynn15@gmail.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "76.111.225.9",

    "Confirm Date": "9/19/2015",

    "Confirmed IP Address": "76.111.225.9",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486257",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "He's a great friend and Doctor.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.6966005",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=17c59206-6711-4089-9723-73de74b8660c"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "Carolyn Bales",

    "Email": "Carolyn_bales@comcast.net",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "108.78.144.217",

    "Confirm Date": "9/18/2015",

    "Confirmed IP Address": "108.78.144.217",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486259",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "All this man cares about is your money! He is emotionally unstable and has treated his last several employees like dirt. If he doesn't care about them,  he doesn't care about you! Find a doctor to put your needs above his own.",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "positive",

    "Sentiment Score": "0.1033878",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=a0f6ca98-448d-49d5-a1e0-4fb67e1dd2d5"

  },

  {

    "PWID": "YLV6J",

    "Display Name": "",

    "Email": "amandameyers44@gmail.com",

    "Provider Name": "Sameer Mehta",

    "Submit Date": "9/17/2015",

    "Submitted IP Address": "70.195.133.173",

    "Confirm Date": "9/17/2015",

    "Confirmed IP Address": "70.195.133.173",

    "Phone": "",

    "Current Survey Status": "Published",

    "Suppressed": "",

    "UserSurveyID": "9486260",

    "Audited By": "jfields",

    "Submission Source Code": "HGRDSURVEY",

    "Confirmation Method": "Email",

    "Would Recommend Score": "5",

    "Answer": "Excellent",

    "Most Recent Audit Date": "9/17/2015",

    "Comment Text": "Dr. Alter is young, energetic, well-educated, very professional, and all around nice guy. His office is clean, and staff is very friendly. There is rarely ever a wait, and if there is, it is very minimal. It is a top rated clinic and when you go, you will see why. Highly recommended!",

    "Current Comment Status": "Approved",

    "Suppressed Comment": "N",

    "Suppressed Date": "",

    "Comment Flag Count": "0",

    "Comment Flagged By Provider": "0",

    "Comment Flagged By Consumer": "0",

    "Sentiment Type": "negative",

    "Sentiment Score": "-0.6734663",

    "Rejection Reason": "",

    "Audit Link": "http://adminstest.healthgrades.com/ProviderAdmin/PesAudit.aspx?Flagged=true&id=d8ed42dc-f7db-471c-86d6-9380838325d1"

  }

];