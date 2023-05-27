import axios from 'axios'
const docusign = require('docusign-esign')
const fs = require('fs')
const path = require('path')
const dotenv = require("dotenv")
dotenv.config();

function makeEnvelope(reqBody) {
    let env = new docusign.EnvelopeDefinition();
    env.templateId = process.env.TEMPLATE_ID;
    let text = docusign.Text.constructFromObject({
        tabLabel: "company_name", value: 'Samaple'});
  
     // Pull together the existing and new tabs in a Tabs object:
     let tabs = docusign.Tabs.constructFromObject({
        textTabs: [text],
     });

    let signer1 = docusign.TemplateRole.constructFromObject({
        email: 'nikhilkarry@gmail.com',
        name: 'nikhil',
        tabs: tabs,
        clientUserId: process.env.CLIENT_USER_ID,
        roleName: 'Manager'
    });
    env.templateRoles = [signer1];
    env.status = "sent";

    return env;
}

function getEnvelopes(request, token) {
    let dsApiClient = new docusign.ApiClient();
    dsApiClient.setBasePath(process.env.BASE_PATH);
    dsApiClient.addDefaultHeader('Authorization', 'Bearer ' + token);
    return new docusign.EnvelopesApi(dsApiClient);
}


function makeRecipientViewRequest(name, email) {
    let viewRequest = new docusign.RecipientViewRequest();
    viewRequest.returnUrl = 'http://localhost:3000';
    viewRequest.authenticationMethod = 'none';
    viewRequest.email = 'nikhilkarry@gmail.com';
    viewRequest.userName = 'nikhil';
    viewRequest.clientUserId = process.env.CLIENT_USER_ID;
    return viewRequest
}

async function checkToken() {
    // if (request.session.access_token && Date.now() < request.session.expires_at) {
    //     console.log("Re-using access token", request.session.access_token)
    // } else {
        console.log("Generating a new token")
        let dsApiClient = new docusign.ApiClient();
        dsApiClient.setBasePath(process.env.BASE_PATH);
        const results = await dsApiClient.requestJWTUserToken(process.env.INTERGATION_KEY, process.env.USER_ID, "signature", fs.readFileSync(path.join(__dirname, "private.key")), 3600);
        // request.session.access_token = results.body.access_token;
        // request.session.expires_at = Date.now() + (results.body.expires_in - 60) * 1000
        return results.body.access_token;
    // }
}

export async function loader({request}) {
    try {
        const token = await checkToken();
        let envelopesApi = getEnvelopes(request, token);
        let envelope = makeEnvelope(request)
        let results = await envelopesApi.createEnvelope(
            process.env.ACCOUNT_ID, { envelopeDefinition: envelope });
        let viewRequest = makeRecipientViewRequest('nikhil', 'nikhilkarry@gmail.com');
        results = await envelopesApi.createRecipientView(process.env.ACCOUNT_ID, results.envelopeId,
            { recipientViewRequest: viewRequest });
        console.log('result success', results.url)
        // res.send({url: results.url})
        return {
            posts: results.url
        }
    } catch (error) {
        console.log("Error message:", error)
    }
   return {
        posts: data
    }
}

export async function action({request}) {
    switch (request.method) {
        case 'POST': {

        }
        case 'PUT': {

        }
        
    }
}