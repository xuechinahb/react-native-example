package com.exampleapp;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.provider.ContactsContract;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 * Created by evan on 20/11/2016.
 */

public class ExampleModule extends ReactContextBaseJavaModule {

    ReactApplicationContext context;
    public ExampleModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "ExampleModule";
    }

    @ReactMethod
    public void openNativeView(String msg){
        Intent intent = new Intent(context, ExampleActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
        context.startActivity(intent);
    }

    @ReactMethod
    public void sendMessage(String msgType){
        Intent intent = new Intent(Intent.ACTION_PICK);
        intent.setType(ContactsContract.Contacts.CONTENT_TYPE);
        Bundle bundle = new Bundle();
        context.startActivityForResult(intent, 1, bundle);

    }

    public void sendContactResult(String msg){
        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("NativeModuleMsg", msg);
    }
//    public void sendContactResult(HashMap<String, String > msg){
//        context.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit("AndroidToRNMessage", msg);
//    }


    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String , Object> map = new HashMap<>();
        map.put("contantName", "contantValue");
        return  map;
    }

    @ReactMethod
    public void promiseEvent(Promise promise){
        String s = "";
        if(null != s){
            promise.resolve("promise success");
        }else{
            promise.reject("404", "promise error");
        }
    }

    @ReactMethod
    public void callbackEvent(Callback callback){
        String s = "";
        if(null != s){
            callback.invoke("callback success");
        }else{
            callback.invoke("callback error");
        }
    }


}
