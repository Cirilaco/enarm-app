package com.enarm.plan180dias

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint
import com.facebook.react.defaults.DefaultReactHost
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {
    override val reactHost: ReactHost by lazy {
        DefaultReactHost.getDefaultReactHost(applicationContext, packageList.packages)
            .apply { DefaultNewArchitectureEntryPoint.load() }
    }

    private val packageList: PackageList by lazy { PackageList(this) }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
}
