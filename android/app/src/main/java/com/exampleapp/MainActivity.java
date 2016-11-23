package com.exampleapp;

import android.content.Intent;
import android.database.Cursor;
import android.net.Uri;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

//    NativeModuleReactPackage nativeModuleReactPackage;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ExampleApp";
    }

    protected  boolean getUseDeveloperSupport(){
        return BuildConfig.DEBUG;
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode != 1 || resultCode != RESULT_OK){
            return;
        }
        Log.i("MSG", "requstCode: " + requestCode + ",resultCode: " + resultCode);
        Uri contactData = data.getData();
        Cursor cursor = managedQuery(contactData, null, null, null,null);
        cursor.moveToFirst();
        String ret = getContactInfo(cursor);
        Log.i("MSG", "onActivityResult: "+ ret);
        MainApplication application= (MainApplication) getApplication();
        application.nativeModuleReactPackage.exampleModule.sendContactResult(ret);
    }

    public String getContactInfo(Cursor cursor){
        String name = "", phoneNumber = "";
        int idColumn = cursor.getColumnIndex(ContactsContract.Contacts._ID);
        String contactId = cursor.getString(idColumn);
        String queryString = ContactsContract.CommonDataKinds.Phone.CONTACT_ID + '=' + contactId;
        Uri uri = ContactsContract.CommonDataKinds.Phone.CONTENT_URI;
        Cursor phone = getContentResolver().query(uri, null, queryString, null, null);
        String dn = ContactsContract.Contacts.DISPLAY_NAME;
        String pn = ContactsContract.CommonDataKinds.Phone.NUMBER;
        if (phone.moveToFirst()){
            for (; !phone.isAfterLast(); phone.moveToNext()){
                name = cursor.getString(cursor.getColumnIndex(dn));
                phoneNumber = phone.getString(phone.getColumnIndex(pn));
            }
            phone.close();
        }
        String result = "{\"msgType\":\"pickContactResult\",\"displayName\":\""+ name + "\", \"phoneNumber\":\""+ phoneNumber +"\"}";
        return result;
//        HashMap<String, String> result = new HashMap<>();
//        result.put("msgType", "pickContactResult");
//        result.put("displayName", name);
//        result.put("phoneNumber", phoneNumber);
//        return result;
    }
}
