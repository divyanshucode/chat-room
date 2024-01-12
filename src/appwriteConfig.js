import { Client, Databases,Account } from 'appwrite';

export const PROJECT_ID='64cdea63402ebf899420'
export const DATABASE_ID='64cdf6e83032bb4ef509'
export const COLLECTION_ID_MESSAGES='64cdf6fcba237cdab52a'

const client = new Client();


//it is not good to expose this add some env later
//also local host change it to vercel/netfliy later on appwrite console
client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('64cdea63402ebf899420');

export const databases = new Databases(client);
export const account= new Account(client);
export default client;
