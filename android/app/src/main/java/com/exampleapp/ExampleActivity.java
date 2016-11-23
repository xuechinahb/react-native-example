package com.exampleapp;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;

/**
 * Created by evan on 20/11/2016.
 */

public class ExampleActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.example);
    }

    public void  btnClick(View view){
        finish();
    }


}
