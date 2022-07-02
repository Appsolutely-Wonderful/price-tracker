/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    let drawer = initializeDrawer();
    initFabs();
    initPriceTracker();
}

// Initialize Material Drawer
function initializeDrawer() {
    let el = document.getElementById('js-nav');
    let drawer = mdc.drawer.MDCDrawer.attachTo(el);
    initializeDrawerListeners(drawer);
    return drawer;
}

// Initialize click listeners to open and close the nav drawer
function initializeDrawerListeners(drawer) {
    let menu_btn = document.getElementById('js-open-drawer');
    if (menu_btn != null) {
        menu_btn.addEventListener('click', function () {
            drawer.open = true;
        });
    }
}

function initFabs() {
    const fabs = new mdc.ripple.MDCRipple(document.querySelector('.mdc-fab'));
}

function initPriceTracker() {
    let tracker = new PriceTracker();
}
