package com.exampleapp;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by evan on 20/11/2016.
 */

public class NativeModuleReactPackage implements ReactPackage {

    ExampleModule exampleModule;
    @Override
    public List<com.facebook.react.bridge.NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<com.facebook.react.bridge.NativeModule> modules = new ArrayList<>();
        exampleModule = new ExampleModule(reactContext);
        modules.add(exampleModule);
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
