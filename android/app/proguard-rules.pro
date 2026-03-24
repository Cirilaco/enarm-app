# React Native

# Keep our interfaces so they can be used by other ProGuard rules.
# See http://sourceforge.net/p/proguard/bugs/466/
-keep,allowobfuscation @interface com.facebook.proguard.annotations.DoNotStrip
-keep,allowobfuscation @interface com.facebook.proguard.annotations.KeepGettersAndSetters
-keep,allowobfuscation @interface com.facebook.react.bridge.ReactMethod

# Do not strip any method/class that is annotated with @DoNotStrip
-keep @com.facebook.proguard.annotations.DoNotStrip class *
-keep @com.facebook.react.bridge.ReactMethod class *

# Keep native methods
-keepclasseswithmembernames class * {
    native <methods>;
}

-keepclassmembers @com.facebook.proguard.annotations.KeepGettersAndSetters class * {
  void set*(***);
  *** get*();
}

-keep class * extends com.facebook.react.bridge.JavaScriptModule { *; }
-keep class * extends com.facebook.react.bridge.NativeModule { *; }
-keepclassmembers class *  { @com.facebook.react.bridge.ReactMethod <methods>; }
-keepclassmembers class *  { @com.facebook.react.bridge.ReactProp <methods>; }
-keepclassmembers class *  { @com.facebook.react.bridge.ReactSetter <methods>; }

-dontwarn com.facebook.react.**
-dontwarn javax.annotation.**
-dontwarn javax.inject.**
-dontwarn sun.misc.**

# TextLayoutBuilder uses a non-public androidx API
-dontwarn androidx.core.text.TextUtilsCompat

# okhttp
-keepattributes Signature
-keepattributes *Annotation*
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }
-dontwarn okhttp3.**

# okio
-keep class sun.misc.Unsafe { *; }
-dontwarn java.nio.file.*
-dontwarn org.codehaus.mojo.animal_sniffer.AnnotationInspector
-keep class okio.** { *; }
-dontwarn okio.**
