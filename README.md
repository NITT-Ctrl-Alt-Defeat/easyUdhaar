<!-- Copy and paste the converted output. -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 1.001 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β28
* Wed Jul 01 2020 15:03:10 GMT-0700 (PDT)
* Source doc: About Us
* This is a partial selection. Check to make sure intra-doc links work.
* Tables are currently converted to HTML tables.
----->



# 💳easyUdhaar

easyUdhaar is a **microlending** startup that **uses financial and non-financial data** to analyze **credit risk** of an applicant and then provide **crowdsourced loans** **at an affordable rate**. It proposes to **collaborate with the government** by integrating **pre-existing schemes** to **identify people most in need** of capital and also to **insure against loan default** under certain conditions.


## The USPs of **easyUdhaar** are :



1. The use of **non-financial data** to calculate the **credit score** of a potential borrower help us **financially include** colateral-lacking borrowers by giving them **access to low-interest loans** which they would not have been able to procure through conventional avenues. 
2. A unique way of calculating lender rewards called **EasyRewards**, which leverages the **economies of scale** effect of the Visa network to generate **sustainable rewards** while **rapidly growing the number of transactions** for Visa
3. The **involvement of pre-exisiting government schemes** to provide aid (not loans) to people whose **credit scores are above a certain risk threshold**. This helps the government by **identifying the people who need government aid the most**. Certain government schemes that provide **default insurance** to banks are also highlighted and further detailed upon in the presentation


## Deployment:



1. Clone the easyUdhaar repo
2. Run `cd easyUdhaar && npm install`
3. Run `npm run development`
4. Project will be deployed on `http://localhost:3000/`

## Deploying payment server:



1. Run `cd easyUdhaar/server/payment`
2. Run `npm install`
3. Run `npm run server`
4. Payment server will deployed on `https://localhost:4500/`

<!-- Copy and paste the converted output. -->

<!-----
NEW: Check the "Suppress top comment" option to remove this info from the output.

Conversion time: 0.428 seconds.


Using this Markdown file:

1. Paste this output into your source file.
2. See the notes and action items below regarding this conversion run.
3. Check the rendered output (headings, lists, code blocks, tables) for proper
   formatting and use a linkchecker before you publish this page.

Conversion notes:

* Docs to Markdown version 1.0β29
* Fri Jul 03 2020 12:33:11 GMT-0700 (PDT)
* Source doc: About Us
* This is a partial selection. Check to make sure intra-doc links work.
----->



### Note:



1. The .env file needs to be added in the root directory of the cloned repository
2. The link for the MongoDB database URL should be set in the parameter `DB_CONNECT` 
3. The token secret to generate Json Web Token should be set as the parameter `TOKEN_SECRET`, 
4. The email id from which verification email has to be set in the parameter `EMAIL_ID` and password for the same will be set in `PASSWORD`.
5. The cred folder has to be made in the directory `/server/payment/` and should include all the API keys in .pem extension and the credentials.json file has to be created to connect specified the API keys of the Visa Direct API.

## TechStack:


<table>
  <tr>
   <td>Component
   </td>
   <td>Written in
   </td>
   <td>Frameworks used
   </td>
   <td>Deployed on
   </td>
  </tr>
  <tr>
   <td>Credit Score API
   </td>
   <td>Python
   </td>
   <td>Flask, LightGBM
   </td>
   <td>Heroku
   </td>
  </tr>
  <tr>
   <td>Frontend
   </td>
   <td>Javascript
   </td>
   <td>React
   </td>
   <td>Local
   </td>
  </tr>
  <tr>
   <td>Backend
   </td>
   <td>Javascript
   </td>
   <td>NodeJS, Express
   </td>
   <td>Local
   </td>
  </tr>
  <tr>
   <td>Database
   </td>
   <td>
   </td>
   <td>MongoDB
   </td>
   <td>Local
   </td>
  </tr>
</table>

 Repository for [Credit Score API](https://github.com/NITT-Ctrl-Alt-Defeat/credit-score)

## Types of Users:



1. Lender 
2. Borrower

**All transactions are implemented via Visa Direct API(VISA pull and push funds transfer).**


## Lender

A lender can **explore active campaigns** and **lend money to the campaign** of their choice and thus earn interest and as well as **EasyRewards**.

He can lend to multiple campaigns and the system monitors his contributions to different campaigns, the return on his investment and his earned **EasyRewards** on the Dashboard.


## Borrower

A borrower **set up a campaign** to generate funds which will constitute a **business or a personal** loan. He is permitted to setup only one campaign at a time. The information he fills up in the application will be used to **calculate the credit score**. His **previous credit scores** will be used as well and generate a new credit score **via a time-series integration.**

The borrower will be able to **track his campaign progress and fund status** via the Dashboard. He will also be able to repay his campaign’s lenders. 

Early repayment is incentivised by lower interest rate.
