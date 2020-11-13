package com.pesasite;
import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.content.Intent;  
import com.tkporter.sendsms.SendSMSPackage;
import com.zoontek.rnbootsplash.RNBootSplash;

public class MainActivity extends ReactActivity {

  @Override
  public void onActivityResult(int requestCode, int resultCode, Intent data)
  {
  super.onActivityResult(requestCode, resultCode, data);
  //probably some other stuff here
  SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
  }
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "PesaSite";
  }

  // Add this for splash screen
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    RNBootSplash.init(R.drawable.bootsplash, MainActivity.this); 
  }
}
