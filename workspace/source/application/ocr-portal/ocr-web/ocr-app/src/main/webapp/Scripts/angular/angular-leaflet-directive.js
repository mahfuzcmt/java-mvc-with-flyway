/**!
 * The MIT License
 *
 * Copyright (c) 2013 the angular-leaflet-directive Team, http://tombatossals.github.io/angular-leaflet-directive
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * angular-leaflet-directive
 * https://github.com/tombatossals/angular-leaflet-directive
 *
 * @authors https://github.com/tombatossals/angular-leaflet-directive/graphs/contributors
 */
/*!
 *  angular-leaflet-directive 0.7.15 2015-04-21
 *  angular-leaflet-directive - An AngularJS directive to easily interact with Leaflet maps
 *  git: https://github.com/tombatossals/angular-leaflet-directive
 */
! function(angular) {
    "use strict";
    angular.module("leaflet-directive", []).directive("leaflet", ["$q", "leafletData", "leafletMapDefaults", "leafletHelpers", "leafletEvents", function(a, b, c, d, e) {
        var f;
        return {
            restrict: "EA",
            replace: !0,
            scope: {
                center: "=",
                defaults: "=",
                maxbounds: "=",
                bounds: "=",
                markers: "=",
                legend: "=",
                geojson: "=",
                paths: "=",
                tiles: "=",
                layers: "=",
                controls: "=",
                decorations: "=",
                eventBroadcast: "=",
                markersWatchOptions: "=",
                geojsonWatchOptions: "="
            },
            transclude: !0,
            template: '<div class="angular-leaflet-map"><div ng-transclude></div></div>',
            controller: ["$scope", function(b) {
                f = a.defer(), this.getMap = function() {
                    return f.promise
                }, this.getLeafletScope = function() {
                    return b
                }
            }],
            link: function(a, g, h) {
                function i() {
                    isNaN(h.width) ? g.css("width", h.width) : g.css("width", h.width + "px")
                }

                function j() {
                    isNaN(h.height) ? g.css("height", h.height) : g.css("height", h.height + "px")
                }
                var k = d.isDefined,
                    l = c.setDefaults(a.defaults, h.id),
                    m = e.genDispatchMapEvent,
                    n = e.getAvailableMapEvents();
                b.setDirectiveControls({}, h.id), k(h.width) && (i(), a.$watch(function() {
                    return g[0].getAttribute("width")
                }, function() {
                    i(), o.invalidateSize()
                })), k(h.height) && (j(), a.$watch(function() {
                    return g[0].getAttribute("height")
                }, function() {
                    j(), o.invalidateSize()
                }));
                var o = new L.Map(g[0], c.getMapCreationDefaults(h.id));
                if (f.resolve(o), k(h.center) || o.setView([l.center.lat, l.center.lng], l.center.zoom), !k(h.tiles) && !k(h.layers)) {
                    var p = L.tileLayer(l.tileLayer, l.tileLayerOptions);
                    p.addTo(o), b.setTiles(p, h.id)
                }
                if (k(o.zoomControl) && k(l.zoomControlPosition) && o.zoomControl.setPosition(l.zoomControlPosition), k(o.zoomControl) && l.zoomControl === !1 && o.zoomControl.removeFrom(o), k(o.zoomsliderControl) && k(l.zoomsliderControl) && l.zoomsliderControl === !1 && o.zoomsliderControl.removeFrom(o), !k(h.eventBroadcast))
                    for (var q = "broadcast", r = 0; r < n.length; r++) {
                        var s = n[r];
                        o.on(s, m(a, s, q), {
                            eventName: s
                        })
                    }
                o.whenReady(function() {
                    b.setMap(o, h.id)
                }), a.$on("$destroy", function() {
                    o.remove(), b.unresolveMap(h.id)
                }), a.$on("invalidateSize", function() {
                    o.invalidateSize()
                })
            }
        }
    }]), angular.module("leaflet-directive").factory("leafletBoundsHelpers", ["$log", "leafletHelpers", function(a, b) {
        function c(a) {
            return angular.isDefined(a) && angular.isDefined(a.southWest) && angular.isDefined(a.northEast) && angular.isNumber(a.southWest.lat) && angular.isNumber(a.southWest.lng) && angular.isNumber(a.northEast.lat) && angular.isNumber(a.northEast.lng)
        }
        var d = b.isArray,
            e = b.isNumber;
        return {
            createLeafletBounds: function(a) {
                return c(a) ? L.latLngBounds([a.southWest.lat, a.southWest.lng], [a.northEast.lat, a.northEast.lng]) : void 0
            },
            isValidBounds: c,
            createBoundsFromArray: function(b) {
                return d(b) && 2 === b.length && d(b[0]) && d(b[1]) && 2 === b[0].length && 2 === b[1].length && e(b[0][0]) && e(b[0][1]) && e(b[1][0]) && e(b[1][1]) ? {
                    northEast: {
                        lat: b[0][0],
                        lng: b[0][1]
                    },
                    southWest: {
                        lat: b[1][0],
                        lng: b[1][1]
                    }
                } : void a.error("[AngularJS - Leaflet] The bounds array is not valid.")
            }
        }
    }]), angular.module("leaflet-directive").factory("leafletControlHelpers", ["$rootScope", "$log", "leafletHelpers", "leafletMapDefaults", function(a, b, c, d) {
        var e = c.isDefined,
            f = c.isObject,
            g = {},
            h = function(a, b, c) {
                var g = d.getDefaults(c);
                if (!g.controls.layers.visible) return !1;
                var h = !1;
                return f(a) && Object.keys(a).forEach(function(b) {
                    var c = a[b];
                    e(c.layerOptions) && c.layerOptions.showOnSelector === !1 || (h = !0)
                }), f(b) && Object.keys(b).forEach(function(a) {
                    var c = b[a];
                    e(c.layerParams) && c.layerParams.showOnSelector === !1 || (h = !0)
                }), h
            },
            i = function(a) {
                var b = d.getDefaults(a),
                    c = {
                        collapsed: b.controls.layers.collapsed,
                        position: b.controls.layers.position,
                        autoZIndex: !1
                    };
                angular.extend(c, b.controls.layers.options);
                var f;
                return f = b.controls.layers && e(b.controls.layers.control) ? b.controls.layers.control.apply(this, [
                    [],
                    [], c
                ]) : new L.control.layers([], [], c)
            };
        return {
            layersControlMustBeVisible: h,
            updateLayersControl: function(a, b, c, d, f, j) {
                var k, l = g[b],
                    m = h(d, f, b);
                if (e(l) && c) {
                    for (k in j.baselayers) l.removeLayer(j.baselayers[k]);
                    for (k in j.overlays) l.removeLayer(j.overlays[k]);
                    a.removeControl(l), delete g[b]
                }
                if (m) {
                    l = i(b), g[b] = l;
                    for (k in d) {
                        var n = e(d[k].layerOptions) && d[k].layerOptions.showOnSelector === !1;
                        !n && e(j.baselayers[k]) && l.addBaseLayer(j.baselayers[k], d[k].name)
                    }
                    for (k in f) {
                        var o = e(f[k].layerParams) && f[k].layerParams.showOnSelector === !1;
                        !o && e(j.overlays[k]) && l.addOverlay(j.overlays[k], f[k].name)
                    }
                    a.addControl(l)
                }
                return m
            }
        }
    }]), angular.module("leaflet-directive").service("leafletData", ["$log", "$q", "leafletHelpers", function(a, b, c) {
        var d = c.getDefer,
            e = c.getUnresolvedDefer,
            f = c.setResolvedDefer,
            g = {},
            h = this,
            i = function(a) {
                return a.charAt(0).toUpperCase() + a.slice(1)
            },
            j = ["map", "tiles", "layers", "paths", "markers", "geoJSON", "UTFGrid", "decorations", "directiveControls"];
        j.forEach(function(a) {
            g[a] = {}
        }), this.unresolveMap = function(a) {
            var b = c.obtainEffectiveMapId(g.map, a);
            j.forEach(function(a) {
                g[a][b] = void 0
            })
        }, j.forEach(function(a) {
            var b = i(a);
            h["set" + b] = function(b, c) {
                var d = e(g[a], c);
                d.resolve(b), f(g[a], c)
            }, h["get" + b] = function(b) {
                var c = d(g[a], b);
                return c.promise
            }
        })
    }]), angular.module("leaflet-directive").service("leafletDirectiveControlsHelpers", ["$log", "leafletData", "leafletHelpers", function(a, b, c) {
        var d = c.isDefined,
            e = c.isString,
            f = c.isObject,
            g = c.errorHeader,
            h = g + "[leafletDirectiveControlsHelpers",
            i = function(c, g, i, j) {
                var k = h + ".extend] ",
                    l = {};
                if (!d(g)) return void a.error(k + "thingToAddName cannot be undefined");
                if (e(g) && d(i) && d(j)) l[g] = {
                    create: i,
                    clean: j
                };
                else {
                    if (!f(g) || d(i) || d(j)) return void a.error(k + "incorrect arguments");
                    l = g
                }
                b.getDirectiveControls().then(function(a) {
                    angular.extend(a, l), b.setDirectiveControls(a, c)
                })
            };
        return {
            extend: i
        }
    }]), angular.module("leaflet-directive").factory("leafletEvents", ["leafletMapEvents", "leafletMarkerEvents", "leafletPathEvents", function(a, b, c) {
        var d = {};
        return angular.extend(d, a, b, c), d
    }]), angular.module("leaflet-directive").service("leafletGeoJsonHelpers", ["leafletHelpers", "leafletIterators", function(a, b) {
        var c = a,
            d = b,
            e = function(a, b) {
                return this.lat = a, this.lng = b, this
            },
            f = function(a) {
                return Array.isArray(a) && 2 === a.length ? a[1] : c.isDefined(a.type) && "Point" === a.type ? +a.coordinates[1] : +a.lat
            },
            g = function(a) {
                return Array.isArray(a) && 2 === a.length ? a[0] : c.isDefined(a.type) && "Point" === a.type ? +a.coordinates[0] : +a.lng
            },
            h = function(a) {
                if (c.isUndefined(a)) return !1;
                if (c.isArray(a)) {
                    if (2 === a.length && c.isNumber(a[0]) && c.isNumber(a[1])) return !0
                } else if (c.isDefined(a.type) && "Point" === a.type && c.isArray(a.coordinates) && 2 === a.coordinates.length && c.isNumber(a.coordinates[0]) && c.isNumber(a.coordinates[1])) return !0;
                var b = d.all(["lat", "lng"], function(b) {
                    return c.isDefined(a[b]) && c.isNumber(a[b])
                });
                return b
            },
            i = function(a) {
                if (a && h(a)) {
                    var b = null;
                    if (Array.isArray(a) && 2 === a.length) b = new e(a[1], a[0]);
                    else {
                        if (!c.isDefined(a.type) || "Point" !== a.type) return a;
                        b = new e(a.coordinates[1], a.coordinates[0])
                    }
                    return angular.extend(a, b)
                }
            };
        return {
            getLat: f,
            getLng: g,
            validateCoords: h,
            getCoords: i
        }
    }]), angular.module("leaflet-directive").factory("leafletHelpers", ["$q", "$log", function(a, b) {
        function c(a, c) {
            var d, f;
            if (angular.isDefined(c)) d = c;
            else if (0 === Object.keys(a).length) d = "main";
            else if (Object.keys(a).length >= 1)
                for (f in a) a.hasOwnProperty(f) && (d = f);
            else 0 === Object.keys(a).length ? d = "main" : b.error(e + "- You have more than 1 map on the DOM, you must provide the map ID to the leafletData.getXXX call");
            return d
        }

        function d(b, d) {
            var e, f = c(b, d);
            return angular.isDefined(b[f]) && b[f].resolvedDefer !== !0 ? e = b[f].defer : (e = a.defer(), b[f] = {
                defer: e,
                resolvedDefer: !1
            }), e
        }
        var e = "[AngularJS - Leaflet] ",
            f = angular.copy,
            g = f,
            h = function(a, b) {
                var c;
                if (a && angular.isObject(a)) return null !== b && angular.isString(b) ? (c = a, b.split(".").forEach(function(a) {
                    c && (c = c[a])
                }), c) : b
            },
            i = function(a) {
                return a.split(".").reduce(function(a, b) {
                    return a + '["' + b + '"]'
                })
            },
            j = function(a) {
                return a.reduce(function(a, b) {
                    return a + "." + b
                })
            },
            k = function(a) {
                return angular.isDefined(a) && null !== a
            },
            l = function(a) {
                return !k(a)
            };
        return {
            copy: f,
            clone: g,
            errorHeader: e,
            getObjectValue: h,
            getObjectArrayPath: i,
            getObjectDotPath: j,
            defaultTo: function(a, b) {
                return k(a) ? a : b
            },
            isTruthy: function(a) {
                return "true" === a || a === !0
            },
            isEmpty: function(a) {
                return 0 === Object.keys(a).length
            },
            isUndefinedOrEmpty: function(a) {
                return angular.isUndefined(a) || null === a || 0 === Object.keys(a).length
            },
            isDefined: k,
            isUndefined: l,
            isNumber: function(a) {
                return angular.isNumber(a)
            },
            isString: function(a) {
                return angular.isString(a)
            },
            isArray: function(a) {
                return angular.isArray(a)
            },
            isObject: function(a) {
                return angular.isObject(a)
            },
            isFunction: function(a) {
                return angular.isFunction(a)
            },
            equals: function(a, b) {
                return angular.equals(a, b)
            },
            isValidCenter: function(a) {
                return angular.isDefined(a) && angular.isNumber(a.lat) && angular.isNumber(a.lng) && angular.isNumber(a.zoom)
            },
            isValidPoint: function(a) {
                return angular.isDefined(a) ? angular.isArray(a) ? 2 === a.length && angular.isNumber(a[0]) && angular.isNumber(a[1]) : angular.isNumber(a.lat) && angular.isNumber(a.lng) : !1
            },
            isSameCenterOnMap: function(a, b) {
                var c = b.getCenter(),
                    d = b.getZoom();
                return a.lat && a.lng && c.lat.toFixed(4) === a.lat.toFixed(4) && c.lng.toFixed(4) === a.lng.toFixed(4) && d === a.zoom ? !0 : !1
            },
            safeApply: function(a, b) {
                var c = a.$root.$$phase;
                "$apply" === c || "$digest" === c ? a.$eval(b) : a.$evalAsync(b)
            },
            obtainEffectiveMapId: c,
            getDefer: function(a, b) {
                var e, f = c(a, b);
                return e = angular.isDefined(a[f]) && a[f].resolvedDefer !== !1 ? a[f].defer : d(a, b)
            },
            getUnresolvedDefer: d,
            setResolvedDefer: function(a, b) {
                var d = c(a, b);
                a[d].resolvedDefer = !0
            },
            FullScreenControlPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.Control.Fullscreen)
                }
            },
            AwesomeMarkersPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.AwesomeMarkers) && angular.isDefined(L.AwesomeMarkers.Icon)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.AwesomeMarkers.Icon : !1
                },
                equal: function(a, b) {
                    return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1
                }
            },
            PolylineDecoratorPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.PolylineDecorator) ? !0 : !1
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.PolylineDecorator : !1
                },
                equal: function(a, b) {
                    return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1
                }
            },
            MakiMarkersPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.MakiMarkers) && angular.isDefined(L.MakiMarkers.Icon) ? !0 : !1
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.MakiMarkers.Icon : !1
                },
                equal: function(a, b) {
                    return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1
                }
            },
            ExtraMarkersPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.ExtraMarkers) && angular.isDefined(L.ExtraMarkers.Icon) ? !0 : !1
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.ExtraMarkers.Icon : !1
                },
                equal: function(a, b) {
                    return this.isLoaded() && this.is(a) ? angular.equals(a, b) : !1
                }
            },
            LabelPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.Label)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.MarkerClusterGroup : !1
                }
            },
            MarkerClusterPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.MarkerClusterGroup)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.MarkerClusterGroup : !1
                }
            },
            GoogleLayerPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.Google)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.Google : !1
                }
            },
            ChinaLayerPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.tileLayer.chinaProvider)
                }
            },
            HeatLayerPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.heatLayer)
                }
            },
            WebGLHeatMapLayerPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.TileLayer.WebGLHeatMap)
                }
            },
            BingLayerPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.BingLayer)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.BingLayer : !1
                }
            },
            WFSLayerPlugin: {
                isLoaded: function() {
                    return void 0 !== L.GeoJSON.WFS
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.GeoJSON.WFS : !1
                }
            },
            AGSLayerPlugin: {
                isLoaded: function() {
                    return void 0 !== lvector && void 0 !== lvector.AGS
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof lvector.AGS : !1
                }
            },
            YandexLayerPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.Yandex)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.Yandex : !1
                }
            },
            DynamicMapLayerPlugin: {
                isLoaded: function() {
                    return void 0 !== L.esri && void 0 !== L.esri.dynamicMapLayer
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.esri.dynamicMapLayer : !1
                }
            },
            GeoJSONPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.TileLayer.GeoJSON)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.TileLayer.GeoJSON : !1
                }
            },
            UTFGridPlugin: {
                isLoaded: function() {
                    return angular.isDefined(L.UtfGrid)
                },
                is: function(a) {
                    return this.isLoaded() ? a instanceof L.UtfGrid : (b.error("[AngularJS - Leaflet] No UtfGrid plugin found."), !1)
                }
            },
            CartoDB: {
                isLoaded: function() {
                    return cartodb
                },
                is: function() {
                    return !0
                }
            },
            Leaflet: {
                DivIcon: {
                    is: function(a) {
                        return a instanceof L.DivIcon
                    },
                    equal: function(a, b) {
                        return this.is(a) ? angular.equals(a, b) : !1
                    }
                },
                Icon: {
                    is: function(a) {
                        return a instanceof L.Icon
                    },
                    equal: function(a, b) {
                        return this.is(a) ? angular.equals(a, b) : !1
                    }
                }
            },
            watchOptions: {
                doWatch: !0,
                isDeep: !0,
                individual: {
                    doWatch: !0,
                    isDeep: !0
                }
            }
        }
    }]), angular.module("leaflet-directive").service("leafletIterators", ["$log", "leafletHelpers", function(a, b) {
        var c, d = b,
            e = b.errorHeader + "leafletIterators: ",
            f = Object.keys,
            g = d.isFunction,
            h = d.isObject,
            i = Math.pow(2, 53) - 1,
            j = function(a) {
                var b = null !== a && a.length;
                return d.isNumber(b) && b >= 0 && i >= b
            },
            k = function(a) {
                return a
            },
            l = function(a) {
                return function(b) {
                    return null === b ? void 0 : b[a]
                }
            },
            m = function(a, b, c) {
                if (void 0 === b) return a;
                switch (null === c ? 3 : c) {
                    case 1:
                        return function(c) {
                            return a.call(b, c)
                        };
                    case 2:
                        return function(c, d) {
                            return a.call(b, c, d)
                        };
                    case 3:
                        return function(c, d, e) {
                            return a.call(b, c, d, e)
                        };
                    case 4:
                        return function(c, d, e, f) {
                            return a.call(b, c, d, e, f)
                        }
                }
                return function() {
                    return a.apply(b, arguments)
                }
            },
            n = function(a, b) {
                return function(c) {
                    var d = arguments.length;
                    if (2 > d || null === c) return c;
                    for (var e = 1; d > e; e++)
                        for (var f = arguments[e], g = a(f), h = g.length, i = 0; h > i; i++) {
                            var j = g[i];
                            b && void 0 !== c[j] || (c[j] = f[j])
                        }
                    return c
                }
            },
            o = null;
        c = o = n(f);
        var p, q = function(a, b) {
                var c = f(b),
                    d = c.length;
                if (null === a) return !d;
                for (var e = Object(a), g = 0; d > g; g++) {
                    var h = c[g];
                    if (b[h] !== e[h] || !(h in e)) return !1
                }
                return !0
            },
            r = null;
        p = r = function(a) {
            return a = c({}, a),
                function(b) {
                    return q(b, a)
                }
        };
        var s, t = function(a, b, c) {
                return null === a ? k : g(a) ? m(a, b, c) : h(a) ? p(a) : l(a)
            },
            u = null;
        s = u = function(a, b, c) {
            b = t(b, c);
            for (var d = !j(a) && f(a), e = (d || a).length, g = 0; e > g; g++) {
                var h = d ? d[g] : g;
                if (!b(a[h], h, a)) return !1
            }
            return !0
        };
        var v = function(b, c, f, g) {
                return f || d.isDefined(b) && d.isDefined(c) ? d.isFunction(c) ? !1 : (g = d.defaultTo(c, "cb"), a.error(e + g + " is not a function"), !0) : (a.error(e + "collection or cb undefined"), !0)
            },
            w = function(a, b, c) {
                if (!v(void 0, c, !0, "internalCb") && !v(a, b))
                    for (var d in a) c(a[d], d)
            },
            x = function(a, b) {
                w(a, b, function(a, c) {
                    b(a, c)
                })
            };
        return window._ ? window._ : {
            each: x,
            every: s,
            all: u
        }
    }]), angular.module("leaflet-directive").factory("leafletLayerHelpers", ["$rootScope", "$log", "leafletHelpers", function($rootScope, $log, leafletHelpers) {
        function isValidLayerType(a) {
            return isString(a.type) ? -1 === Object.keys(layerTypes).indexOf(a.type) ? ($log.error("[AngularJS - Leaflet] A layer must have a valid type: " + Object.keys(layerTypes)), !1) : layerTypes[a.type].mustHaveUrl && !isString(a.url) ? ($log.error("[AngularJS - Leaflet] A base layer must have an url"), !1) : layerTypes[a.type].mustHaveData && !isDefined(a.data) ? ($log.error('[AngularJS - Leaflet] The base layer must have a "data" array attribute'), !1) : layerTypes[a.type].mustHaveLayer && !isDefined(a.layer) ? ($log.error("[AngularJS - Leaflet] The type of layer " + a.type + " must have an layer defined"), !1) : layerTypes[a.type].mustHaveBounds && !isDefined(a.bounds) ? ($log.error("[AngularJS - Leaflet] The type of layer " + a.type + " must have bounds defined"), !1) : layerTypes[a.type].mustHaveKey && !isDefined(a.key) ? ($log.error("[AngularJS - Leaflet] The type of layer " + a.type + " must have key defined"), !1) : !0 : ($log.error("[AngularJS - Leaflet] A layer must have a valid type defined."), !1)
        }

        function createLayer(a) {
            if (isValidLayerType(a)) {
                if (!isString(a.name)) return void $log.error("[AngularJS - Leaflet] A base layer must have a name");
                isObject(a.layerParams) || (a.layerParams = {}), isObject(a.layerOptions) || (a.layerOptions = {});
                for (var b in a.layerParams) a.layerOptions[b] = a.layerParams[b];
                var c = {
                    url: a.url,
                    data: a.data,
                    options: a.layerOptions,
                    layer: a.layer,
                    type: a.layerType,
                    bounds: a.bounds,
                    key: a.key,
                    pluginOptions: a.pluginOptions,
                    user: a.user
                };
                return layerTypes[a.type].createLayer(c)
            }
        }
        var Helpers = leafletHelpers,
            isString = leafletHelpers.isString,
            isObject = leafletHelpers.isObject,
            isArray = leafletHelpers.isArray,
            isDefined = leafletHelpers.isDefined,
            utfGridCreateLayer = function(a) {
                if (!Helpers.UTFGridPlugin.isLoaded()) return void $log.error("[AngularJS - Leaflet] The UTFGrid plugin is not loaded.");
                var b = new L.UtfGrid(a.url, a.pluginOptions);
                return b.on("mouseover", function(a) {
                    $rootScope.$broadcast("leafletDirectiveMap.utfgridMouseover", a)
                }), b.on("mouseout", function(a) {
                    $rootScope.$broadcast("leafletDirectiveMap.utfgridMouseout", a)
                }), b.on("click", function(a) {
                    $rootScope.$broadcast("leafletDirectiveMap.utfgridClick", a)
                }), b
            },
            layerTypes = {
                xyz: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        return L.tileLayer(a.url, a.options)
                    }
                },
                mapbox: {
                    mustHaveKey: !0,
                    createLayer: function(a) {
                        var b = "//{s}.tiles.mapbox.com/v3/" + a.key + "/{z}/{x}/{y}.png";
                        return L.tileLayer(b, a.options)
                    }
                },
                geoJSON: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        return Helpers.GeoJSONPlugin.isLoaded() ? new L.TileLayer.GeoJSON(a.url, a.pluginOptions, a.options) : void 0
                    }
                },
                utfGrid: {
                    mustHaveUrl: !0,
                    createLayer: utfGridCreateLayer
                },
                cartodbTiles: {
                    mustHaveKey: !0,
                    createLayer: function(a) {
                        var b = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/{z}/{x}/{y}.png";
                        return L.tileLayer(b, a.options)
                    }
                },
                cartodbUTFGrid: {
                    mustHaveKey: !0,
                    mustHaveLayer: !0,
                    createLayer: function(a) {
                        return a.url = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/" + a.layer + "/{z}/{x}/{y}.grid.json", utfGridCreateLayer(a)
                    }
                },
                cartodbInteractive: {
                    mustHaveKey: !0,
                    mustHaveLayer: !0,
                    createLayer: function(a) {
                        var b = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/{z}/{x}/{y}.png",
                            c = L.tileLayer(b, a.options);
                        a.url = "//" + a.user + ".cartodb.com/api/v1/map/" + a.key + "/" + a.layer + "/{z}/{x}/{y}.grid.json";
                        var d = utfGridCreateLayer(a);
                        return L.layerGroup([c, d])
                    }
                },
                wms: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        return L.tileLayer.wms(a.url, a.options)
                    }
                },
                wmts: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        return L.tileLayer.wmts(a.url, a.options)
                    }
                },
                wfs: {
                    mustHaveUrl: !0,
                    mustHaveLayer: !0,
                    createLayer: function(params) {
                        if (Helpers.WFSLayerPlugin.isLoaded()) {
                            var options = angular.copy(params.options);
                            return options.crs && "string" == typeof options.crs && (options.crs = eval(options.crs)), new L.GeoJSON.WFS(params.url, params.layer, options)
                        }
                    }
                },
                group: {
                    mustHaveUrl: !1,
                    createLayer: function(a) {
                        var b = [];
                        return angular.forEach(a.options.layers, function(a) {
                            b.push(createLayer(a))
                        }), L.layerGroup(b)
                    }
                },
                featureGroup: {
                    mustHaveUrl: !1,
                    createLayer: function() {
                        return L.featureGroup()
                    }
                },
                google: {
                    mustHaveUrl: !1,
                    createLayer: function(a) {
                        var b = a.type || "SATELLITE";
                        if (Helpers.GoogleLayerPlugin.isLoaded()) return new L.Google(b, a.options)
                    }
                },
                china: {
                    mustHaveUrl: !1,
                    createLayer: function(a) {
                        var b = a.type || "";
                        if (Helpers.ChinaLayerPlugin.isLoaded()) return L.tileLayer.chinaProvider(b, a.options)
                    }
                },
                ags: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        if (Helpers.AGSLayerPlugin.isLoaded()) {
                            var b = angular.copy(a.options);
                            angular.extend(b, {
                                url: a.url
                            });
                            var c = new lvector.AGS(b);
                            return c.onAdd = function(a) {
                                this.setMap(a)
                            }, c.onRemove = function() {
                                this.setMap(null)
                            }, c
                        }
                    }
                },
                dynamic: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        return Helpers.DynamicMapLayerPlugin.isLoaded() ? L.esri.dynamicMapLayer(a.url, a.options) : void 0
                    }
                },
                markercluster: {
                    mustHaveUrl: !1,
                    createLayer: function(a) {
                        return Helpers.MarkerClusterPlugin.isLoaded() ? new L.MarkerClusterGroup(a.options) : void $log.error("[AngularJS - Leaflet] The markercluster plugin is not loaded.")
                    }
                },
                bing: {
                    mustHaveUrl: !1,
                    createLayer: function(a) {
                        return Helpers.BingLayerPlugin.isLoaded() ? new L.BingLayer(a.key, a.options) : void 0
                    }
                },
                webGLHeatmap: {
                    mustHaveUrl: !1,
                    mustHaveData: !0,
                    createLayer: function(a) {
                        if (Helpers.WebGLHeatMapLayerPlugin.isLoaded()) {
                            var b = new L.TileLayer.WebGLHeatMap(a.options);
                            return isDefined(a.data) && b.setData(a.data), b
                        }
                    }
                },
                heat: {
                    mustHaveUrl: !1,
                    mustHaveData: !0,
                    createLayer: function(a) {
                        if (Helpers.HeatLayerPlugin.isLoaded()) {
                            var b = new L.heatLayer;
                            return isArray(a.data) && b.setLatLngs(a.data), isObject(a.options) && b.setOptions(a.options), b
                        }
                    }
                },
                yandex: {
                    mustHaveUrl: !1,
                    createLayer: function(a) {
                        var b = a.type || "map";
                        if (Helpers.YandexLayerPlugin.isLoaded()) return new L.Yandex(b, a.options)
                    }
                },
                imageOverlay: {
                    mustHaveUrl: !0,
                    mustHaveBounds: !0,
                    createLayer: function(a) {
                        return L.imageOverlay(a.url, a.bounds, a.options)
                    }
                },
                custom: {
                    createLayer: function(a) {
                        return a.layer instanceof L.Class ? angular.copy(a.layer) : void $log.error("[AngularJS - Leaflet] A custom layer must be a leaflet Class")
                    }
                },
                cartodb: {
                    mustHaveUrl: !0,
                    createLayer: function(a) {
                        return cartodb.createLayer(a.map, a.url)
                    }
                }
            };
        return {
            createLayer: createLayer
        }
    }]), angular.module("leaflet-directive").factory("leafletLegendHelpers", function() {
        var a = function(a, b, c, d) {
                if (a.innerHTML = "", b.error) a.innerHTML += '<div class="info-title alert alert-danger">' + b.error.message + "</div>";
                else if ("arcgis" === c)
                    for (var e = 0; e < b.layers.length; e++) {
                        var f = b.layers[e];
                        a.innerHTML += '<div class="info-title" data-layerid="' + f.layerId + '">' + f.layerName + "</div>";
                        for (var g = 0; g < f.legend.length; g++) {
                            var h = f.legend[g];
                            a.innerHTML += '<div class="inline" data-layerid="' + f.layerId + '"><img src="data:' + h.contentType + ";base64," + h.imageData + '" /></div><div class="info-label" data-layerid="' + f.layerId + '">' + h.label + "</div>"
                        }
                    } else "image" === c && (a.innerHTML = '<img src="' + d + '"/>')
            },
            b = function(b, c, d, e) {
                return function() {
                    var f = L.DomUtil.create("div", c);
                    return L.Browser.touch ? L.DomEvent.on(f, "click", L.DomEvent.stopPropagation) : (L.DomEvent.disableClickPropagation(f), L.DomEvent.on(f, "mousewheel", L.DomEvent.stopPropagation)), a(f, b, d, e), f
                }
            },
            c = function(a, b) {
                return function() {
                    for (var c = L.DomUtil.create("div", b), d = 0; d < a.colors.length; d++) c.innerHTML += '<div class="outline"><i style="background:' + a.colors[d] + '"></i></div><div class="info-label">' + a.labels[d] + "</div>";
                    return L.Browser.touch ? L.DomEvent.on(c, "click", L.DomEvent.stopPropagation) : (L.DomEvent.disableClickPropagation(c), L.DomEvent.on(c, "mousewheel", L.DomEvent.stopPropagation)), c
                }
            };
        return {
            getOnAddLegend: b,
            getOnAddArrayLegend: c,
            updateLegend: a
        }
    }), angular.module("leaflet-directive").factory("leafletMapDefaults", ["$q", "leafletHelpers", function(a, b) {
        function c() {
            return {
                keyboard: !0,
                dragging: !0,
                worldCopyJump: !1,
                doubleClickZoom: !0,
                scrollWheelZoom: !0,
                tap: !0,
                touchZoom: !0,
                zoomControl: !0,
                zoomsliderControl: !1,
                zoomControlPosition: "topleft",
                attributionControl: !0,
                controls: {
                    layers: {
                        visible: !0,
                        position: "topright",
                        collapsed: !0
                    }
                },
                crs: L.CRS.EPSG3857,
                tileLayer: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                tileLayerOptions: {
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                },
                path: {
                    weight: 10,
                    opacity: 1,
                    color: "#0000ff"
                },
                center: {
                    lat: 0,
                    lng: 0,
                    zoom: 1
                }
            }
        }
        var d = b.isDefined,
            e = b.isObject,
            f = b.obtainEffectiveMapId,
            g = {};
        return {
            getDefaults: function(a) {
                var b = f(g, a);
                return g[b]
            },
            getMapCreationDefaults: function(a) {
                var b = f(g, a),
                    c = g[b],
                    e = {
                        maxZoom: c.maxZoom,
                        keyboard: c.keyboard,
                        dragging: c.dragging,
                        zoomControl: c.zoomControl,
                        doubleClickZoom: c.doubleClickZoom,
                        scrollWheelZoom: c.scrollWheelZoom,
                        tap: c.tap,
                        touchZoom: c.touchZoom,
                        attributionControl: c.attributionControl,
                        worldCopyJump: c.worldCopyJump,
                        crs: c.crs
                    };
                if (d(c.minZoom) && (e.minZoom = c.minZoom), d(c.zoomAnimation) && (e.zoomAnimation = c.zoomAnimation), d(c.fadeAnimation) && (e.fadeAnimation = c.fadeAnimation), d(c.markerZoomAnimation) && (e.markerZoomAnimation = c.markerZoomAnimation), c.map)
                    for (var h in c.map) e[h] = c.map[h];
                return e
            },
            setDefaults: function(a, b) {
                var h = c();
                d(a) && (h.doubleClickZoom = d(a.doubleClickZoom) ? a.doubleClickZoom : h.doubleClickZoom, h.scrollWheelZoom = d(a.scrollWheelZoom) ? a.scrollWheelZoom : h.doubleClickZoom, h.tap = d(a.tap) ? a.tap : h.tap, h.touchZoom = d(a.touchZoom) ? a.touchZoom : h.doubleClickZoom, h.zoomControl = d(a.zoomControl) ? a.zoomControl : h.zoomControl, h.zoomsliderControl = d(a.zoomsliderControl) ? a.zoomsliderControl : h.zoomsliderControl, h.attributionControl = d(a.attributionControl) ? a.attributionControl : h.attributionControl, h.tileLayer = d(a.tileLayer) ? a.tileLayer : h.tileLayer, h.zoomControlPosition = d(a.zoomControlPosition) ? a.zoomControlPosition : h.zoomControlPosition, h.keyboard = d(a.keyboard) ? a.keyboard : h.keyboard, h.dragging = d(a.dragging) ? a.dragging : h.dragging, d(a.controls) && angular.extend(h.controls, a.controls), e(a.crs) ? h.crs = a.crs : d(L.CRS[a.crs]) && (h.crs = L.CRS[a.crs]), d(a.center) && angular.copy(a.center, h.center), d(a.tileLayerOptions) && angular.copy(a.tileLayerOptions, h.tileLayerOptions), d(a.maxZoom) && (h.maxZoom = a.maxZoom), d(a.minZoom) && (h.minZoom = a.minZoom), d(a.zoomAnimation) && (h.zoomAnimation = a.zoomAnimation), d(a.fadeAnimation) && (h.fadeAnimation = a.fadeAnimation), d(a.markerZoomAnimation) && (h.markerZoomAnimation = a.markerZoomAnimation), d(a.worldCopyJump) && (h.worldCopyJump = a.worldCopyJump), d(a.map) && (h.map = a.map), d(a.path) && (h.path = a.path));
                var i = f(g, b);
                return g[i] = h, h
            }
        }
    }]), angular.module("leaflet-directive").service("leafletMarkersHelpers", ["$rootScope", "leafletHelpers", "$log", "$compile", "leafletGeoJsonHelpers", function(a, b, c, d, e) {
        var f = b.isDefined,
            g = b.defaultTo,
            h = b.MarkerClusterPlugin,
            i = b.AwesomeMarkersPlugin,
            j = b.MakiMarkersPlugin,
            k = b.ExtraMarkersPlugin,
            l = b.safeApply,
            m = b,
            n = b.isString,
            o = b.isNumber,
            p = b.isObject,
            q = {},
            r = e,
            s = b.errorHeader,
            t = function(a) {
                var b = "";
                return ["_icon", "_latlng", "_leaflet_id", "_map", "_shadow"].forEach(function(c) {
                    b += c + ": " + g(a[c], "undefined") + " \n"
                }), "[leafletMarker] : \n" + b
            },
            u = function(a, b) {
                var d = b ? console : c;
                d.debug(t(a))
            },
            v = function(a) {
                if (f(a) && f(a.type) && "awesomeMarker" === a.type) return i.isLoaded() || c.error(s + " The AwesomeMarkers Plugin is not loaded."), new L.AwesomeMarkers.icon(a);
                if (f(a) && f(a.type) && "makiMarker" === a.type) return j.isLoaded() || c.error(s + "The MakiMarkers Plugin is not loaded."), new L.MakiMarkers.icon(a);
                if (f(a) && f(a.type) && "extraMarker" === a.type) return k.isLoaded() || c.error(s + "The ExtraMarkers Plugin is not loaded."), new L.ExtraMarkers.icon(a);
                if (f(a) && f(a.type) && "div" === a.type) return new L.divIcon(a);
                if (f(a) && f(a.type) && "icon" === a.type) return a.icon;
                var b = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAGmklEQVRYw7VXeUyTZxjvNnfELFuyIzOabermMZEeQC/OclkO49CpOHXOLJl/CAURuYbQi3KLgEhbrhZ1aDwmaoGqKII6odATmH/scDFbdC7LvFqOCc+e95s2VG50X/LLm/f4/Z7neY/ne18aANCmAr5E/xZf1uDOkTcGcWR6hl9247tT5U7Y6SNvWsKT63P58qbfeLJG8M5qcgTknrvvrdDbsT7Ml+tv82X6vVxJE33aRmgSyYtcWVMqX97Yv2JvW39UhRE2HuyBL+t+gK1116ly06EeWFNlAmHxlQE0OMiV6mQCScusKRlhS3QLeVJdl1+23h5dY4FNB3thrbYboqptEFlphTC1hSpJnbRvxP4NWgsE5Jyz86QNNi/5qSUTGuFk1gu54tN9wuK2wc3o+Wc13RCmsoBwEqzGcZsxsvCSy/9wJKf7UWf1mEY8JWfewc67UUoDbDjQC+FqK4QqLVMGGR9d2wurKzqBk3nqIT/9zLxRRjgZ9bqQgub+DdoeCC03Q8j+0QhFhBHR/eP3U/zCln7Uu+hihJ1+bBNffLIvmkyP0gpBZWYXhKussK6mBz5HT6M1Nqpcp+mBCPXosYQfrekGvrjewd59/GvKCE7TbK/04/ZV5QZYVWmDwH1mF3xa2Q3ra3DBC5vBT1oP7PTj4C0+CcL8c7C2CtejqhuCnuIQHaKHzvcRfZpnylFfXsYJx3pNLwhKzRAwAhEqG0SpusBHfAKkxw3w4627MPhoCH798z7s0ZnBJ/MEJbZSbXPhER2ih7p2ok/zSj2cEJDd4CAe+5WYnBCgR2uruyEw6zRoW6/DWJ/OeAP8pd/BGtzOZKpG8oke0SX6GMmRk6GFlyAc59K32OTEinILRJRchah8HQwND8N435Z9Z0FY1EqtxUg+0SO6RJ/mmXz4VuS+DpxXC3gXmZwIL7dBSH4zKE50wESf8qwVgrP1EIlTO5JP9Igu0aexdh28F1lmAEGJGfh7jE6ElyM5Rw/FDcYJjWhbeiBYoYNIpc2FT/SILivp0F1ipDWk4BIEo2VuodEJUifhbiltnNBIXPUFCMpthtAyqws/BPlEF/VbaIxErdxPphsU7rcCp8DohC+GvBIPJS/tW2jtvTmmAeuNO8BNOYQeG8G/2OzCJ3q+soYB5i6NhMaKr17FSal7GIHheuV3uSCY8qYVuEm1cOzqdWr7ku/R0BDoTT+DT+ohCM6/CCvKLKO4RI+dXPeAuaMqksaKrZ7L3FE5FIFbkIceeOZ2OcHO6wIhTkNo0ffgjRGxEqogXHYUPHfWAC/lADpwGcLRY3aeK4/oRGCKYcZXPVoeX/kelVYY8dUGf8V5EBRbgJXT5QIPhP9ePJi428JKOiEYhYXFBqou2Guh+p/mEB1/RfMw6rY7cxcjTrneI1FrDyuzUSRm9miwEJx8E/gUmqlyvHGkneiwErR21F3tNOK5Tf0yXaT+O7DgCvALTUBXdM4YhC/IawPU+2PduqMvuaR6eoxSwUk75ggqsYJ7VicsnwGIkZBSXKOUww73WGXyqP+J2/b9c+gi1YAg/xpwck3gJuucNrh5JvDPvQr0WFXf0piyt8f8/WI0hV4pRxxkQZdJDfDJNOAmM0Ag8jyT6hz0WGXWuP94Yh2jcfjmXAGvHCMslRimDHYuHuDsy2QtHuIavznhbYURq5R57KpzBBRZKPJi8eQg48h4j8SDdowifdIrEVdU+gbO6QNvRRt4ZBthUaZhUnjlYObNagV3keoeru3rU7rcuceqU1mJBxy+BWZYlNEBH+0eH4vRiB+OYybU2hnblYlTvkHinM4m54YnxSyaZYSF6R3jwgP7udKLGIX6r/lbNa9N6y5MFynjWDtrHd75ZvTYAPO/6RgF0k76mQla3FGq7dO+cH8sKn0Vo7nDllwAhqwLPkxrHwWmHJOo+AKJ4rab5OgrM7rVu8eWb2Pu0Dh4eDgXoOfvp7Y7QeqknRmvcTBEyq9m/HQQSCSz6LHq3z0yzsNySRfMS253wl2KyRDbcZPcfJKjZmSEOjcxyi+Y8dUOtsIEH6R2wNykdqrkYJ0RV92H0W58pkfQk7cKevsLK10Py8SdMGfXNXATY+pPbyJR/ET6n9nIfztNtZYRV9XniQu9IA2vOVgy4ir7GCLVmmd+zjkH0eAF9Po6K61pmCXHxU5rHMYd1ftc3owjwRSVRzLjKvqZEty6cRUD7jGqiOdu5HG6MdHjNcNYGqfDm5YRzLBBCCDl/2bk8a8gdbqcfwECu62Fg/HrggAAAABJRU5ErkJggg==",
                    d = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAYAAACoYAD2AAAC5ElEQVRYw+2YW4/TMBCF45S0S1luXZCABy5CgLQgwf//S4BYBLTdJLax0fFqmB07nnQfEGqkIydpVH85M+NLjPe++dcPc4Q8Qh4hj5D/AaQJx6H/4TMwB0PeBNwU7EGQAmAtsNfAzoZkgIa0ZgLMa4Aj6CxIAsjhjOCoL5z7Glg1JAOkaicgvQBXuncwJAWjksLtBTWZe04CnYRktUGdilALppZBOgHGZcBzL6OClABvMSVIzyBjazOgrvACf1ydC5mguqAVg6RhdkSWQFj2uxfaq/BrIZOLEWgZdALIDvcMcZLD8ZbLC9de4yR1sYMi4G20S4Q/PWeJYxTOZn5zJXANZHIxAd4JWhPIloTJZhzMQduM89WQ3MUVAE/RnhAXpTycqys3NZALOBbB7kFrgLesQl2h45Fcj8L1tTSohUwuxhy8H/Qg6K7gIs+3kkaigQCOcyEXCHN07wyQazhrmIulvKMQAwMcmLNqyCVyMAI+BuxSMeTk3OPikLY2J1uE+VHQk6ANrhds+tNARqBeaGc72cK550FP4WhXmFmcMGhTwAR1ifOe3EvPqIegFmF+C8gVy0OfAaWQPMR7gF1OQKqGoBjq90HPMP01BUjPOqGFksC4emE48tWQAH0YmvOgF3DST6xieJgHAWxPAHMuNhrImIdvoNOKNWIOcE+UXE0pYAnkX6uhWsgVXDxHdTfCmrEEmMB2zMFimLVOtiiajxiGWrbU52EeCdyOwPEQD8LqyPH9Ti2kgYMf4OhSKB7qYILbBv3CuVTJ11Y80oaseiMWOONc/Y7kJYe0xL2f0BaiFTxknHO5HaMGMublKwxFGzYdWsBF174H/QDknhTHmHHN39iWFnkZx8lPyM8WHfYELmlLKtgWNmFNzQcC1b47gJ4hL19i7o65dhH0Negbca8vONZoP7doIeOC9zXm8RjuL0Gf4d4OYaU5ljo3GYiqzrWQHfJxA6ALhDpVKv9qYeZA8eM3EhfPSCmpuD0AAAAASUVORK5CYII=";
                return f(a) && f(a.iconUrl) ? new L.Icon(a) : new L.Icon.Default({
                    iconUrl: b,
                    shadowUrl: d,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })
            },
            w = function(a) {
                f(q[a]) && q.splice(a, 1)
            },
            x = function() {
                q = {}
            },
            y = function(a, b, c) {
                if (a.closePopup(), f(c) && f(c.overlays))
                    for (var d in c.overlays)
                        if ((c.overlays[d] instanceof L.LayerGroup || c.overlays[d] instanceof L.FeatureGroup) && c.overlays[d].hasLayer(a)) return void c.overlays[d].removeLayer(a);
                if (f(q))
                    for (var e in q) q[e].hasLayer(a) && q[e].removeLayer(a);
                b.hasLayer(a) && b.removeLayer(a)
            },
            z = function(b, c) {
                b.openPopup();
                var e = b.getPopup(),
                    g = angular.isFunction(c.getMessageScope) ? c.getMessageScope() : a,
                    h = f(c.compileMessage) ? c.compileMessage : !0;
                if (f(e)) {
                    var i = function(a) {
                        a._updateLayout(), a._updatePosition()
                    };
                    if (h)
                        if (d(e._contentNode)(g), f(e._contentNode) && e._contentNode.innerHTML.indexOf("ngInclude") > -1) var j = g.$on("$includeContentLoaded", function() {
                            i(e), j()
                        });
                        else i(e)
                }
            },
            A = function(b, c) {
                var e = angular.isFunction(c.getMessageScope) ? c.getMessageScope() : a,
                    g = angular.isFunction(c.getLabelScope) ? c.getLabelScope() : e,
                    h = f(c.compileMessage) ? c.compileMessage : !0;
                m.LabelPlugin.isLoaded() && f(c.label) && (f(c.label.options) && c.label.options.noHide === !0 && b.showLabel(), h && f(b.label) && d(b.label._container)(g))
            };
        return {
            resetMarkerGroup: w,
            resetMarkerGroups: x,
            deleteMarker: y,
            manageOpenPopup: z,
            manageOpenLabel: A,
            createMarker: function(a) {
                if (!f(a) || !r.validateCoords(a)) return void c.error(s + "The marker definition is not valid.");
                var b = r.getCoords(a);
                if (!f(b)) return void c.error(s + "Unable to get coordinates from markerData.");
                var d = {
                    icon: v(a.icon),
                    title: f(a.title) ? a.title : "",
                    draggable: f(a.draggable) ? a.draggable : !1,
                    clickable: f(a.clickable) ? a.clickable : !0,
                    riseOnHover: f(a.riseOnHover) ? a.riseOnHover : !1,
                    zIndexOffset: f(a.zIndexOffset) ? a.zIndexOffset : 0,
                    iconAngle: f(a.iconAngle) ? a.iconAngle : 0
                };
                for (var e in a) a.hasOwnProperty(e) && !d.hasOwnProperty(e) && (d[e] = a[e]);
                var g = new L.marker(b, d);
                return n(a.message) || g.unbindPopup(), g
            },
            addMarkerToGroup: function(a, b, d, e) {
                return n(b) ? h.isLoaded() ? (f(q[b]) || (q[b] = new L.MarkerClusterGroup(d), e.addLayer(q[b])), void q[b].addLayer(a)) : void c.error(s + "The MarkerCluster plugin is not loaded.") : void c.error(s + "The marker group you have specified is invalid.")
            },
            listenMarkerEvents: function(a, b, c) {
                a.on("popupopen", function() {
                    l(c, function() {
                        b.focus = !0, z(a, b)
                    })
                }), a.on("popupclose", function() {
                    l(c, function() {
                        b.focus = !1
                    })
                }), a.on("add", function() {
                    l(c, function() {
                        "label" in b && A(a, b)
                    })
                })
            },
            addMarkerWatcher: function(a, b, d, e, h, i) {
                var j = m.getObjectArrayPath("markers." + b);
                i = g(i, !0);
                var k = d.$watch(j, function(b, d) {
                    if (!f(b)) return y(a, h, e), void k();
                    if (f(d)) {
                        if (!r.validateCoords(b)) return c.warn("There are problems with lat-lng data, please verify your marker model"), void y(a, h, e);
                        var g = b === d;
                        if (f(b.iconAngle) && d.iconAngle !== b.iconAngle && a.setIconAngle(b.iconAngle), n(b.layer) || n(d.layer) && (f(e.overlays[d.layer]) && e.overlays[d.layer].hasLayer(a) && (e.overlays[d.layer].removeLayer(a),
                                a.closePopup()), h.hasLayer(a) || h.addLayer(a)), (o(b.opacity) || o(parseFloat(b.opacity))) && b.opacity !== d.opacity && a.setOpacity(b.opacity), n(b.layer) && d.layer !== b.layer) {
                            if (n(d.layer) && f(e.overlays[d.layer]) && e.overlays[d.layer].hasLayer(a) && e.overlays[d.layer].removeLayer(a), a.closePopup(), h.hasLayer(a) && h.removeLayer(a), !f(e.overlays[b.layer])) return void c.error(s + "You must use a name of an existing layer");
                            var i = e.overlays[b.layer];
                            if (!(i instanceof L.LayerGroup || i instanceof L.FeatureGroup)) return void c.error(s + 'A marker can only be added to a layer of type "group" or "featureGroup"');
                            i.addLayer(a), h.hasLayer(a) && b.focus === !0 && z(a, b)
                        }
                        if (b.draggable !== !0 && d.draggable === !0 && f(a.dragging) && a.dragging.disable(), b.draggable === !0 && d.draggable !== !0 && (a.dragging ? a.dragging.enable() : L.Handler.MarkerDrag && (a.dragging = new L.Handler.MarkerDrag(a), a.options.draggable = !0, a.dragging.enable())), p(b.icon) || p(d.icon) && (a.setIcon(v()), a.closePopup(), a.unbindPopup(), n(b.message) && a.bindPopup(b.message, b.popupOptions)), p(b.icon) && p(d.icon) && !angular.equals(b.icon, d.icon)) {
                            var j = !1;
                            a.dragging && (j = a.dragging.enabled()), a.setIcon(v(b.icon)), j && a.dragging.enable(), a.closePopup(), a.unbindPopup(), n(b.message) && a.bindPopup(b.message, b.popupOptions)
                        }!n(b.message) && n(d.message) && (a.closePopup(), a.unbindPopup()), m.LabelPlugin.isLoaded() && (f(b.label) && f(b.label.message) ? "label" in d && "message" in d.label && !angular.equals(b.label.message, d.label.message) ? a.updateLabelContent(b.label.message) : angular.isFunction(a.getLabel) ? A(a, b) : (a.bindLabel(b.label.message, b.label.options), A(a, b)) : (!("label" in b) || "message" in b.label) && angular.isFunction(a.unbindLabel) && a.unbindLabel()), n(b.message) && !n(d.message) && a.bindPopup(b.message, b.popupOptions), n(b.message) && n(d.message) && b.message !== d.message && a.setPopupContent(b.message);
                        var l = !1;
                        b.focus !== !0 && d.focus === !0 && (a.closePopup(), l = !0), (b.focus === !0 && (!f(d.focus) || d.focus === !1) || g && b.focus === !0) && (z(a, b), l = !0), d.zIndexOffset !== b.zIndexOffset && a.setZIndexOffset(b.zIndexOffset);
                        var q = a.getLatLng(),
                            t = n(b.layer) && m.MarkerClusterPlugin.is(e.overlays[b.layer]);
                        t ? l ? (b.lat !== d.lat || b.lng !== d.lng) && (e.overlays[b.layer].removeLayer(a), a.setLatLng([b.lat, b.lng]), e.overlays[b.layer].addLayer(a)) : q.lat !== b.lat || q.lng !== b.lng ? (e.overlays[b.layer].removeLayer(a), a.setLatLng([b.lat, b.lng]), e.overlays[b.layer].addLayer(a)) : b.lat !== d.lat || b.lng !== d.lng ? (e.overlays[b.layer].removeLayer(a), a.setLatLng([b.lat, b.lng]), e.overlays[b.layer].addLayer(a)) : p(b.icon) && p(d.icon) && !angular.equals(b.icon, d.icon) && (e.overlays[b.layer].removeLayer(a), e.overlays[b.layer].addLayer(a)) : (q.lat !== b.lat || q.lng !== b.lng) && a.setLatLng([b.lat, b.lng])
                    }
                }, i)
            },
            string: t,
            log: u
        }
    }]), angular.module("leaflet-directive").factory("leafletPathsHelpers", ["$rootScope", "$log", "leafletHelpers", function(a, b, c) {
        function d(a) {
            return a.filter(function(a) {
                return k(a)
            }).map(function(a) {
                return e(a)
            })
        }

        function e(a) {
            return i(a) ? new L.LatLng(a[0], a[1]) : new L.LatLng(a.lat, a.lng)
        }

        function f(a) {
            return a.map(function(a) {
                return d(a)
            })
        }

        function g(a, b) {
            for (var c = {}, d = 0; d < l.length; d++) {
                var e = l[d];
                h(a[e]) ? c[e] = a[e] : h(b.path[e]) && (c[e] = b.path[e])
            }
            return c
        }
        var h = c.isDefined,
            i = c.isArray,
            j = c.isNumber,
            k = c.isValidPoint,
            l = ["stroke", "weight", "color", "opacity", "fill", "fillColor", "fillOpacity", "dashArray", "lineCap", "lineJoin", "clickable", "pointerEvents", "className", "smoothFactor", "noClip"],
            m = function(a, b) {
                for (var c = {}, d = 0; d < l.length; d++) {
                    var e = l[d];
                    h(b[e]) && (c[e] = b[e])
                }
                a.setStyle(b)
            },
            n = function(a) {
                if (!i(a)) return !1;
                for (var b = 0; b < a.length; b++) {
                    var c = a[b];
                    if (!k(c)) return !1
                }
                return !0
            },
            o = {
                polyline: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        return n(b)
                    },
                    createPath: function(a) {
                        return new L.Polyline([], a)
                    },
                    setPath: function(a, b) {
                        a.setLatLngs(d(b.latlngs)), m(a, b)
                    }
                },
                multiPolyline: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        if (!i(b)) return !1;
                        for (var c in b) {
                            var d = b[c];
                            if (!n(d)) return !1
                        }
                        return !0
                    },
                    createPath: function(a) {
                        return new L.multiPolyline([
                            [
                                [0, 0],
                                [1, 1]
                            ]
                        ], a)
                    },
                    setPath: function(a, b) {
                        a.setLatLngs(f(b.latlngs)), m(a, b)
                    }
                },
                polygon: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        return n(b)
                    },
                    createPath: function(a) {
                        return new L.Polygon([], a)
                    },
                    setPath: function(a, b) {
                        a.setLatLngs(d(b.latlngs)), m(a, b)
                    }
                },
                multiPolygon: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        if (!i(b)) return !1;
                        for (var c in b) {
                            var d = b[c];
                            if (!n(d)) return !1
                        }
                        return !0
                    },
                    createPath: function(a) {
                        return new L.MultiPolygon([
                            [
                                [0, 0],
                                [1, 1],
                                [0, 1]
                            ]
                        ], a)
                    },
                    setPath: function(a, b) {
                        a.setLatLngs(f(b.latlngs)), m(a, b)
                    }
                },
                rectangle: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        if (!i(b) || 2 !== b.length) return !1;
                        for (var c in b) {
                            var d = b[c];
                            if (!k(d)) return !1
                        }
                        return !0
                    },
                    createPath: function(a) {
                        return new L.Rectangle([
                            [0, 0],
                            [1, 1]
                        ], a)
                    },
                    setPath: function(a, b) {
                        a.setBounds(new L.LatLngBounds(d(b.latlngs))), m(a, b)
                    }
                },
                circle: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        return k(b) && j(a.radius)
                    },
                    createPath: function(a) {
                        return new L.Circle([0, 0], 1, a)
                    },
                    setPath: function(a, b) {
                        a.setLatLng(e(b.latlngs)), h(b.radius) && a.setRadius(b.radius), m(a, b)
                    }
                },
                circleMarker: {
                    isValid: function(a) {
                        var b = a.latlngs;
                        return k(b) && j(a.radius)
                    },
                    createPath: function(a) {
                        return new L.CircleMarker([0, 0], a)
                    },
                    setPath: function(a, b) {
                        a.setLatLng(e(b.latlngs)), h(b.radius) && a.setRadius(b.radius), m(a, b)
                    }
                }
            },
            p = function(a) {
                var b = {};
                return a.latlngs && (b.latlngs = a.latlngs), a.radius && (b.radius = a.radius), b
            };
        return {
            setPathOptions: function(a, b, c) {
                h(b) || (b = "polyline"), o[b].setPath(a, c)
            },
            createPath: function(a, c, d) {
                h(c.type) || (c.type = "polyline");
                var e = g(c, d),
                    f = p(c);
                return o[c.type].isValid(f) ? o[c.type].createPath(e) : void b.error("[AngularJS - Leaflet] Invalid data passed to the " + c.type + " path")
            }
        }
    }]), angular.module("leaflet-directive").service("leafletWatchHelpers", function() {
        var a = function(a, b, c, d, e) {
                var f = a[b](c, function(a, b) {
                    e(a, b), d.doWatch || f()
                }, d.isDeep);
                return f
            },
            b = function(b, c, d, e) {
                return a(b, "$watch", c, d, e)
            },
            c = function(b, c, d, e) {
                return a(b, "$watchCollection", c, d, e)
            };
        return {
            maybeWatch: b,
            maybeWatchCollection: c
        }
    }), angular.module("leaflet-directive").directive("bounds", ["$log", "$timeout", "leafletHelpers", "leafletBoundsHelpers", function(a, b, c, d) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: ["leaflet", "center"],
            link: function(e, f, g, h) {
                var i = c.isDefined,
                    j = d.createLeafletBounds,
                    k = h[0].getLeafletScope(),
                    l = h[0],
                    m = function(a) {
                        return 0 === a._southWest.lat && 0 === a._southWest.lng && 0 === a._northEast.lat && 0 === a._northEast.lng
                    };
                l.getMap().then(function(c) {
                    k.$on("boundsChanged", function(a) {
                        var b = a.currentScope,
                            d = c.getBounds();
                        if (!m(d) && !b.settingBoundsFromScope) {
                            var e = {
                                northEast: {
                                    lat: d._northEast.lat,
                                    lng: d._northEast.lng
                                },
                                southWest: {
                                    lat: d._southWest.lat,
                                    lng: d._southWest.lng
                                }
                            };
                            angular.equals(b.bounds, e) || (b.bounds = e)
                        }
                    }), k.$watch("bounds", function(d) {
                        if (!i(d)) return void a.error("[AngularJS - Leaflet] Invalid bounds");
                        var f = j(d);
                        f && !c.getBounds().equals(f) && (e.settingBoundsFromScope = !0, c.fitBounds(f), b(function() {
                            e.settingBoundsFromScope = !1
                        }))
                    }, !0)
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("center", ["$log", "$q", "$location", "$timeout", "leafletMapDefaults", "leafletHelpers", "leafletBoundsHelpers", "leafletEvents", function(a, b, c, d, e, f, g, h) {
        var i, j = f.isDefined,
            k = f.isNumber,
            l = f.isSameCenterOnMap,
            m = f.safeApply,
            n = f.isValidCenter,
            o = g.isValidBounds,
            p = f.isUndefinedOrEmpty,
            q = function(a, b) {
                return j(a) && o(a) && p(b)
            };
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            controller: function() {
                i = b.defer(), this.getCenter = function() {
                    return i.promise
                }
            },
            link: function(b, f, o, p) {
                var r = p.getLeafletScope(),
                    s = r.center;
                p.getMap().then(function(f) {
                    var p = e.getDefaults(o.id);
                    if (-1 !== o.center.search("-")) return a.error('The "center" variable can\'t use a "-" on his key name: "' + o.center + '".'), void f.setView([p.center.lat, p.center.lng], p.center.zoom);
                    if (q(r.bounds, s)) f.fitBounds(g.createLeafletBounds(r.bounds)), s = f.getCenter(), m(r, function(a) {
                        a.center = {
                            lat: f.getCenter().lat,
                            lng: f.getCenter().lng,
                            zoom: f.getZoom(),
                            autoDiscover: !1
                        }, angular.extend(a.center, {
                            lat: f.getCenter().lat,
                            lng: f.getCenter().lng,
                            zoom: f.getZoom(),
                            autoDiscover: !1
                        })
                    }), m(r, function(a) {
                        var b = f.getBounds();
                        a.bounds = {
                            northEast: {
                                lat: b._northEast.lat,
                                lng: b._northEast.lng
                            },
                            southWest: {
                                lat: b._southWest.lat,
                                lng: b._southWest.lng
                            }
                        }
                    });
                    else {
                        if (!j(s)) return a.error('The "center" property is not defined in the main scope'), void f.setView([p.center.lat, p.center.lng], p.center.zoom);
                        j(s.lat) && j(s.lng) || j(s.autoDiscover) || angular.copy(p.center, s)
                    }
                    var t, u;
                    if ("yes" === o.urlHashCenter) {
                        var v = function() {
                            var a, b = c.search();
                            if (j(b.c)) {
                                var d = b.c.split(":");
                                3 === d.length && (a = {
                                    lat: parseFloat(d[0]),
                                    lng: parseFloat(d[1]),
                                    zoom: parseInt(d[2], 10)
                                })
                            }
                            return a
                        };
                        t = v(), r.$on("$locationChangeSuccess", function(a) {
                            var b = a.currentScope,
                                c = v();
                            j(c) && !l(c, f) && (b.center = {
                                lat: c.lat,
                                lng: c.lng,
                                zoom: c.zoom
                            })
                        })
                    }
                    r.$watch("center", function(b) {
                        return j(t) && (angular.copy(t, b), t = void 0), n(b) || b.autoDiscover === !0 ? b.autoDiscover === !0 ? (k(b.zoom) || f.setView([p.center.lat, p.center.lng], p.center.zoom), void f.locate(k(b.zoom) && b.zoom > p.center.zoom ? {
                            setView: !0,
                            maxZoom: b.zoom
                        } : j(p.maxZoom) ? {
                            setView: !0,
                            maxZoom: p.maxZoom
                        } : {
                            setView: !0
                        })) : void(u && l(b, f) || (r.settingCenterFromScope = !0, f.setView([b.lat, b.lng], b.zoom), h.notifyCenterChangedToBounds(r, f), d(function() {
                            r.settingCenterFromScope = !1
                        }))) : void a.warn("[AngularJS - Leaflet] invalid 'center'")
                    }, !0), f.whenReady(function() {
                        u = !0
                    }), f.on("moveend", function() {
                        i.resolve(), h.notifyCenterUrlHashChanged(r, f, o, c.search()), l(s, f) || b.settingCenterFromScope || m(r, function(a) {
                            r.settingCenterFromScope || angular.extend(a.center, {
                                lat: f.getCenter().lat,
                                lng: f.getCenter().lng,
                                zoom: f.getZoom(),
                                autoDiscover: !1
                            }), h.notifyCenterChangedToBounds(r, f)
                        })
                    }), s.autoDiscover === !0 && f.on("locationerror", function() {
                        a.warn("[AngularJS - Leaflet] The Geolocation API is unauthorized on this page."), n(s) ? (f.setView([s.lat, s.lng], s.zoom), h.notifyCenterChangedToBounds(r, f)) : (f.setView([p.center.lat, p.center.lng], p.center.zoom), h.notifyCenterChangedToBounds(r, f))
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("controls", ["$log", "leafletHelpers", function(a, b) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "?^leaflet",
            link: function(c, d, e, f) {
                if (f) {
                    var g = b.isDefined,
                        h = f.getLeafletScope(),
                        i = h.controls;
                    f.getMap().then(function(c) {
                        if (g(L.Control.Draw) && g(i.draw)) {
                            g(i.edit) || (i.edit = {
                                featureGroup: new L.FeatureGroup
                            }, c.addLayer(i.edit.featureGroup));
                            var d = new L.Control.Draw(i);
                            c.addControl(d)
                        }
                        if (g(i.scale)) {
                            var e = new L.control.scale(i.scale);
                            c.addControl(e)
                        }
                        if (g(i.fullscreen))
                            if (b.FullScreenControlPlugin.isLoaded()) {
                                var f = new L.Control.Fullscreen(i.fullscreen);
                                c.addControl(f)
                            } else a.error("[AngularJS - Leaflet] Fullscreen plugin is not loaded.");
                        if (g(i.custom))
                            for (var h in i.custom) c.addControl(i.custom[h])
                    })
                }
            }
        }
    }]), angular.module("leaflet-directive").directive("decorations", ["$log", "leafletHelpers", function(a, b) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            link: function(c, d, e, f) {
                function g(b) {
                    return k(b) && k(b.coordinates) && (j.isLoaded() || a.error("[AngularJS - Leaflet] The PolylineDecorator Plugin is not loaded.")), L.polylineDecorator(b.coordinates)
                }

                function h(a, b) {
                    return k(a) && k(b) && k(b.coordinates) && k(b.patterns) ? (a.setPaths(b.coordinates), a.setPatterns(b.patterns), a) : void 0
                }
                var i = f.getLeafletScope(),
                    j = b.PolylineDecoratorPlugin,
                    k = b.isDefined,
                    l = {};
                f.getMap().then(function(a) {
                    i.$watch("decorations", function(b) {
                        for (var c in l) k(b[c]) && angular.equals(b[c], l) || (a.removeLayer(l[c]), delete l[c]);
                        for (var d in b) {
                            var e = b[d],
                                f = g(e);
                            k(f) && (l[d] = f, a.addLayer(f), h(f, e))
                        }
                    }, !0)
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("eventBroadcast", ["$log", "$rootScope", "leafletHelpers", "leafletEvents", function(a, b, c, d) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            link: function(b, e, f, g) {
                var h = c.isObject,
                    i = c.isDefined,
                    j = g.getLeafletScope(),
                    k = j.eventBroadcast,
                    l = d.getAvailableMapEvents(),
                    m = d.genDispatchMapEvent;
                g.getMap().then(function(b) {
                    var c, d, e = [],
                        f = "broadcast";
                    if (i(k.map))
                        if (h(k.map))
                            if ("emit" !== k.map.logic && "broadcast" !== k.map.logic ? a.warn("[AngularJS - Leaflet] Available event propagation logic are: 'emit' or 'broadcast'.") : f = k.map.logic, h(k.map.enable) && k.map.enable.length >= 0)
                                for (c = 0; c < k.map.enable.length; c++) d = k.map.enable[c], -1 === e.indexOf(d) && -1 !== l.indexOf(d) && e.push(d);
                            else a.warn("[AngularJS - Leaflet] event-broadcast.map.enable must be an object check your model.");
                    else a.warn("[AngularJS - Leaflet] event-broadcast.map must be an object check your model.");
                    else e = l;
                    for (c = 0; c < e.length; c++) d = e[c], b.on(d, m(j, d, f), {
                        eventName: d
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("geojson", ["$log", "$rootScope", "leafletData", "leafletHelpers", "leafletWatchHelpers", "leafletDirectiveControlsHelpers", "leafletIterators", function(a, b, c, d, e, f, g) {
        var h = e.maybeWatchCollection,
            i = d.watchOptions,
            j = f.extend,
            k = d,
            l = g;
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            link: function(a, e, f, g) {
                var m = d.safeApply,
                    n = d.isDefined,
                    o = g.getLeafletScope(),
                    p = {},
                    q = !1;
                g.getMap().then(function(a) {
                    var e = o.geojsonWatchOptions || i,
                        g = function(a) {
                            var c, e = a.resetStyleOnMouseout;
                            return c = angular.isFunction(a.onEachFeature) ? a.onEachFeature : function(c, f) {
                                d.LabelPlugin.isLoaded() && n(a.label) && f.bindLabel(c.properties.description), f.on({
                                    mouseover: function(a) {
                                        m(o, function() {
                                            b.$broadcast("leafletDirectiveMap.geojsonMouseover", c, a)
                                        })
                                    },
                                    mouseout: function(a) {
                                        e && p.resetStyle(a.target), m(o, function() {
                                            b.$broadcast("leafletDirectiveMap.geojsonMouseout", a)
                                        })
                                    },
                                    click: function(a) {
                                        m(o, function() {
                                            b.$broadcast("leafletDirectiveMap.geojsonClick", c, a)
                                        })
                                    }
                                })
                            }
                        },
                        r = k.isDefined(f.geojsonNested) && k.isTruthy(f.geojsonNested),
                        s = function() {
                            if (p) {
                                var b = function(b) {
                                    n(b) && a.hasLayer(b) && a.removeLayer(b)
                                };
                                return r ? void l.each(p, function(a) {
                                    b(a)
                                }) : void b(p)
                            }
                        },
                        t = function(b, d) {
                            var e = angular.copy(b);
                            if (n(e) && n(e.data)) {
                                var h = g(e);
                                n(e.options) || (e.options = {
                                    style: e.style,
                                    filter: e.filter,
                                    onEachFeature: h,
                                    pointToLayer: e.pointToLayer
                                });
                                var i = L.geoJson(e.data, e.options);
                                d && k.isString(d) ? p[d] = i : p = i, i.addTo(a), q || (q = !0, c.setGeoJSON(p, f.id))
                            }
                        },
                        u = function(a) {
                            if (s(), r) {
                                if (!a || !Object.keys(a).length) return;
                                return void l.each(a, function(a, b) {
                                    t(a, b)
                                })
                            }
                            t(a)
                        };
                    j(f.id, "geojson", u, s), h(o, "geojson", e, function(a) {
                        u(a)
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("layercontrol", ["$log", "leafletData", "leafletHelpers", function(a, b, c) {
        return {
            restrict: "E",
            scope: {},
            replace: !0,
            transclude: !1,
            require: "^leaflet",
            controller: ["$scope", "$element", "$sce", function(d, e, f) {
                a.debug("[Angular Directive - Layers] layers", d, e);
                var g = c.safeApply,
                    h = c.isDefined;
                angular.extend(d, {
                    baselayer: "",
                    icons: {
                        uncheck: "fa fa-check-square-o",
                        check: "fa fa-square-o",
                        radio: "fa fa-dot-circle-o",
                        unradio: "fa fa-circle-o",
                        up: "fa fa-angle-up",
                        down: "fa fa-angle-down",
                        open: "fa fa-angle-double-down",
                        close: "fa fa-angle-double-up"
                    },
                    changeBaseLayer: function(a, e) {
                        c.safeApply(d, function(c) {
                            c.baselayer = a, b.getMap().then(function(e) {
                                b.getLayers().then(function(b) {
                                    if (!e.hasLayer(b.baselayers[a])) {
                                        for (var f in c.layers.baselayers) c.layers.baselayers[f].icon = c.icons.unradio, e.hasLayer(b.baselayers[f]) && e.removeLayer(b.baselayers[f]);
                                        e.addLayer(b.baselayers[a]), c.layers.baselayers[a].icon = d.icons.radio
                                    }
                                })
                            })
                        }), e.preventDefault()
                    },
                    moveLayer: function(a, b, c) {
                        var e = Object.keys(d.layers.baselayers).length;
                        if (b >= 1 + e && b <= d.overlaysArray.length + e) {
                            var f;
                            for (var h in d.layers.overlays)
                                if (d.layers.overlays[h].index === b) {
                                    f = d.layers.overlays[h];
                                    break
                                }
                            f && g(d, function() {
                                f.index = a.index, a.index = b
                            })
                        }
                        c.stopPropagation(), c.preventDefault()
                    },
                    initIndex: function(a, b) {
                        var c = Object.keys(d.layers.baselayers).length;
                        a.index = h(a.index) ? a.index : b + c + 1
                    },
                    toggleOpacity: function(b, c) {
                        if (a.debug("Event", b), c.visible) {
                            var e = angular.element(b.currentTarget);
                            e.toggleClass(d.icons.close + " " + d.icons.open), e = e.parents(".lf-row").find(".lf-opacity"), e.toggle("fast", function() {
                                g(d, function() {
                                    c.opacityControl = !c.opacityControl
                                })
                            })
                        }
                        b.stopPropagation(), b.preventDefault()
                    },
                    unsafeHTML: function(a) {
                        return f.trustAsHtml(a)
                    }
                });
                var i = e.get(0);
                L.Browser.touch ? L.DomEvent.on(i, "click", L.DomEvent.stopPropagation) : (L.DomEvent.disableClickPropagation(i), L.DomEvent.on(i, "mousewheel", L.DomEvent.stopPropagation))
            }],
            template: '<div class="angular-leaflet-control-layers" ng-show="overlaysArray.length"><div class="lf-baselayers"><div class="lf-row" ng-repeat="(key, layer) in layers.baselayers"><label class="lf-icon-bl" ng-click="changeBaseLayer(key, $event)"><input class="leaflet-control-layers-selector" type="radio" name="lf-radio" ng-show="false" ng-checked="baselayer === key" ng-value="key" /> <i class="lf-icon lf-icon-radio" ng-class="layer.icon"></i><div class="lf-text">{{layer.name}}</div></label></div></div><div class="lf-overlays"><div class="lf-container"><div class="lf-row" ng-repeat="layer in overlaysArray | orderBy:\'index\':order" ng-init="initIndex(layer, $index)"><label class="lf-icon-ol"><input class="lf-control-layers-selector" type="checkbox" ng-show="false" ng-model="layer.visible"/> <i class="lf-icon lf-icon-check" ng-class="layer.icon"></i><div class="lf-text">{{layer.name}}</div><div class="lf-icons"><i class="lf-icon lf-up" ng-class="icons.up" ng-click="moveLayer(layer, layer.index - orderNumber, $event)"></i> <i class="lf-icon lf-down" ng-class="icons.down" ng-click="moveLayer(layer, layer.index + orderNumber, $event)"></i> <i class="lf-icon lf-open" ng-class="layer.opacityControl? icons.close:icons.open" ng-click="toggleOpacity($event, layer)"></i></div></label><div class="lf-legend" ng-if="layer.legend" ng-bind-html="unsafeHTML(layer.legend)"></div><div class="lf-opacity" ng-show="layer.visible &amp;&amp; layer.opacityControl"><input type="text" class="lf-opacity-control" name="lf-opacity-control" data-key="{{layer.index}}" /></div></div></div></div></div>',
            link: function(d, e, f, g) {
                var h = c.isDefined,
                    i = g.getLeafletScope(),
                    j = i.layers;
                f.order = !h(f.order) || "normal" !== f.order && "reverse" !== f.order ? "normal" : f.order, d.order = "normal" === f.order, d.orderNumber = "normal" === f.order ? -1 : 1, d.layers = j, g.getMap().then(function(c) {
                    i.$watch("layers.baselayers", function(a) {
                        b.getLayers().then(function(b) {
                            var e;
                            for (e in a) c.hasLayer(b.baselayers[e]) ? a[e].icon = d.icons.radio : a[e].icon = d.icons.unradio
                        })
                    }), i.$watch("layers.overlays", function(f) {
                        var g = [];
                        b.getLayers().then(function(a) {
                            for (var b in f) f[b].icon = d.icons[f[b].visible ? "uncheck" : "check"], g.push(f[b]), h(f[b].index) && a.overlays[b].setZIndex && a.overlays[b].setZIndex(f[b].index)
                        });
                        var i = d.$watch(function() {
                            return e.children().size() > 1 ? (e.find(".lf-overlays").trigger("resize"), e.find(".lf-opacity").size() === Object.keys(j.overlays).length) : void 0
                        }, function(f) {
                            f === !0 && (h(e.find(".lf-opacity-control").ionRangeSlider) ? e.find(".lf-opacity-control").each(function(a, e) {
                                var f, g = Object.keys(j.baselayers).length;
                                for (var i in d.overlaysArray) d.overlaysArray[i].index === a + g + 1 && (f = d.overlaysArray[i]);
                                var k = angular.element(e),
                                    l = h(f) && h(f.layerOptions) ? f.layerOptions.opacity : void 0;
                                k.ionRangeSlider({
                                    min: 0,
                                    from: h(l) ? Math.ceil(100 * l) : 100,
                                    step: 1,
                                    max: 100,
                                    prettify: !1,
                                    hasGrid: !1,
                                    hideMinMax: !0,
                                    onChange: function(a) {
                                        b.getLayers().then(function(b) {
                                            var d, e, f = a.input.data().key;
                                            for (var g in j.overlays)
                                                if (j.overlays[g].index === f) {
                                                    d = b.overlays[g], e = j.overlays[g];
                                                    break
                                                }
                                            c.hasLayer(d) && (e.layerOptions = h(e.layerOptions) ? e.layerOptions : {}, e.layerOptions.opacity = a.input.val() / 100, d.setOpacity && d.setOpacity(a.input.val() / 100), d.getLayers && d.eachLayer && d.eachLayer(function(b) {
                                                b.setOpacity && b.setOpacity(a.input.val() / 100)
                                            }))
                                        })
                                    }
                                })
                            }) : a.warn("[AngularJS - Leaflet] Ion Slide Range Plugin is not loaded"), i())
                        });
                        d.overlaysArray = g
                    }, !0)
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("layers", ["$log", "$q", "leafletData", "leafletHelpers", "leafletLayerHelpers", "leafletControlHelpers", function(a, b, c, d, e, f) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            controller: ["$scope", function(a) {
                a._leafletLayers = b.defer(), this.getLayers = function() {
                    return a._leafletLayers.promise
                }
            }],
            link: function(a, b, g, h) {
                var i = d.isDefined,
                    j = {},
                    k = h.getLeafletScope(),
                    l = k.layers,
                    m = e.createLayer,
                    n = f.updateLayersControl,
                    o = !1;
                h.getMap().then(function(b) {
                    a._leafletLayers.resolve(j), c.setLayers(j, g.id), j.baselayers = {}, j.overlays = {};
                    var d = g.id,
                        e = !1;
                    for (var f in l.baselayers) {
                        var h = m(l.baselayers[f]);
                        i(h) ? (j.baselayers[f] = h, l.baselayers[f].top === !0 && (b.addLayer(j.baselayers[f]), e = !0)) : delete l.baselayers[f]
                    }!e && Object.keys(j.baselayers).length > 0 && b.addLayer(j.baselayers[Object.keys(l.baselayers)[0]]);
                    for (f in l.overlays) {
                        "cartodb" === l.overlays[f].type;
                        var p = m(l.overlays[f]);
                        i(p) ? (j.overlays[f] = p, l.overlays[f].visible === !0 && b.addLayer(j.overlays[f])) : delete l.overlays[f]
                    }
                    k.$watch("layers.baselayers", function(a) {
                        for (var c in j.baselayers) i(a[c]) || (b.hasLayer(j.baselayers[c]) && b.removeLayer(j.baselayers[c]), delete j.baselayers[c]);
                        for (var e in a)
                            if (i(j.baselayers[e])) a[e].top !== !0 || b.hasLayer(j.baselayers[e]) ? a[e].top === !1 && b.hasLayer(j.baselayers[e]) && b.removeLayer(j.baselayers[e]) : b.addLayer(j.baselayers[e]);
                            else {
                                var f = m(a[e]);
                                i(f) && (j.baselayers[e] = f, a[e].top === !0 && b.addLayer(j.baselayers[e]))
                            }
                        var g = !1;
                        for (var h in j.baselayers)
                            if (b.hasLayer(j.baselayers[h])) {
                                g = !0;
                                break
                            }!g && Object.keys(j.baselayers).length > 0 && b.addLayer(j.baselayers[Object.keys(j.baselayers)[0]]), o = n(b, d, o, a, l.overlays, j)
                    }, !0), k.$watch("layers.overlays", function(a) {
                        for (var c in j.overlays) i(a[c]) || (b.hasLayer(j.overlays[c]) && b.removeLayer(j.overlays[c]), delete j.overlays[c]);
                        for (var e in a) {
                            if (!i(j.overlays[e])) {
                                var f = m(a[e]);
                                if (!i(f)) continue;
                                j.overlays[e] = f, a[e].visible === !0 && b.addLayer(j.overlays[e])
                            }
                            a[e].visible && !b.hasLayer(j.overlays[e]) ? b.addLayer(j.overlays[e]) : a[e].visible === !1 && b.hasLayer(j.overlays[e]) && b.removeLayer(j.overlays[e]), a[e].visible && b._loaded && a[e].data && "heatmap" === a[e].type && (j.overlays[e].setData(a[e].data), j.overlays[e].update())
                        }
                        o = n(b, d, o, l.baselayers, a, j)
                    }, !0)
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("legend", ["$log", "$http", "leafletHelpers", "leafletLegendHelpers", function(a, b, c, d) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            link: function(e, f, g, h) {
                var i, j, k, l, m = c.isArray,
                    n = c.isDefined,
                    o = c.isFunction,
                    p = h.getLeafletScope(),
                    q = p.legend;
                p.$watch("legend", function(a) {
                    n(a) && (i = a.legendClass ? a.legendClass : "legend", j = a.position || "bottomright", l = a.type || "arcgis")
                }, !0), h.getMap().then(function(c) {
                    p.$watch("legend", function(b) {
                        return n(b) ? n(b.url) || "arcgis" !== l || m(b.colors) && m(b.labels) && b.colors.length === b.labels.length ? n(b.url) ? void a.info("[AngularJS - Leaflet] loading legend service.") : (n(k) && (k.removeFrom(c), k = null), k = L.control({
                            position: j
                        }), "arcgis" === l && (k.onAdd = d.getOnAddArrayLegend(b, i)), void k.addTo(c)) : void a.warn("[AngularJS - Leaflet] legend.colors and legend.labels must be set.") : void(n(k) && (k.removeFrom(c), k = null))
                    }), p.$watch("legend.url", function(e) {
                        n(e) && b.get(e).success(function(a) {
                            n(k) ? d.updateLegend(k.getContainer(), a, l, e) : (k = L.control({
                                position: j
                            }), k.onAdd = d.getOnAddLegend(a, i, l, e), k.addTo(c)), n(q.loadedData) && o(q.loadedData) && q.loadedData()
                        }).error(function() {
                            a.warn("[AngularJS - Leaflet] legend.url not loaded.")
                        })
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("markers", ["$log", "$rootScope", "$q", "leafletData", "leafletHelpers", "leafletMapDefaults", "leafletMarkersHelpers", "leafletEvents", "leafletIterators", "leafletWatchHelpers", "leafletDirectiveControlsHelpers", function(a, b, c, d, e, f, g, h, i, j, k) {
        var l = e.isDefined,
            m = e.errorHeader,
            n = e,
            o = e.isString,
            p = g.addMarkerWatcher,
            q = g.listenMarkerEvents,
            r = g.addMarkerToGroup,
            s = h.bindMarkerEvents,
            t = g.createMarker,
            u = g.deleteMarker,
            v = i,
            w = e.watchOptions,
            x = j.maybeWatch,
            y = k.extend,
            z = function(b, c, d, e, f, h) {
                if (!o(b)) return a.error(m + " A layername must be a string"), !1;
                if (!l(c)) return a.error(m + " You must add layers to the directive if the markers are going to use this functionality."), !1;
                if (!l(c.overlays) || !l(c.overlays[b])) return a.error(m + ' A marker can only be added to a layer of type "group"'), !1;
                var i = c.overlays[b];
                return i instanceof L.LayerGroup || i instanceof L.FeatureGroup ? (i.addLayer(e), !f && h.hasLayer(e) && d.focus === !0 && g.manageOpenPopup(e, d), !0) : (a.error(m + ' Adding a marker to an overlay needs a overlay of the type "group" or "featureGroup"'), !1)
            },
            A = function(b, c, d, e, f, h, i) {
                for (var j in b)
                    if (-1 === j.search("-")) {
                        if (!l(e[j])) {
                            var k = n.copy(b[j]),
                                o = t(k),
                                u = (k ? k.layer : void 0) || i;
                            if (!l(o)) {
                                a.error(m + " Received invalid data on the marker " + j + ".");
                                continue
                            }
                            if (e[j] = o, l(k.message) && o.bindPopup(k.message, k.popupOptions), l(k.group)) {
                                var v = l(k.groupOption) ? k.groupOption : null;
                                r(o, k.group, v, c)
                            }
                            if (n.LabelPlugin.isLoaded() && l(k.label) && l(k.label.message) && o.bindLabel(k.label.message, k.label.options), l(k) && (l(k.layer) || l(i))) {
                                var w = z(u, d, k, o, h.individual.doWatch, c);
                                if (!w) continue
                            } else l(k.group) || (c.addLayer(o), h.individual.doWatch || k.focus !== !0 || g.manageOpenPopup(o, k));
                            var x = n.getObjectDotPath(i ? [i, j] : [j]);
                            h.individual.doWatch && p(o, x, f, d, c, h.individual.doWatch), q(o, k, f, h.individual.doWatch), s(o, x, k, f, u)
                        }
                    } else a.error('The marker can\'t use a "-" on his key name: "' + j + '".')
            },
            B = function(b, c, d, e, f) {
                var g = !1,
                    h = !1,
                    i = l(c);
                for (var j in d) g || (a.debug(m + "[markers] destroy: "), g = !0), i && (h = !angular.equals(b[j], c[j])), l(b) && Object.keys(b).length && l(b[j]) && Object.keys(b[j]).length && !h || (u(d[j], e, f), delete d[j])
            };
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: ["leaflet", "?layers"],
            link: function(a, b, e, f) {
                var g = f[0],
                    h = g.getLeafletScope();
                g.getMap().then(function(a) {
                    var b, g = {};
                    b = l(f[1]) ? f[1].getLayers : function() {
                        var a = c.defer();
                        return a.resolve(), a.promise
                    };
                    var i = h.markersWatchOptions || w;
                    l(e.watchMarkers) && (i.doWatch = i.individual.doWatch = !l(e.watchMarkers) || n.isTruthy(e.watchMarkers));
                    var j = l(e.markersNested) && n.isTruthy(e.markersNested);
                    b().then(function(b) {
                        var c = function(c, d) {
                                B(c, d, g, a, b)
                            },
                            f = function(d, e) {
                                return c(d, e), j ? void v.each(d, function(c, d) {
                                    A(c, a, b, g, h, i, d)
                                }) : void A(d, a, b, g, h, i)
                            };
                        y(e.id, "markers", f, c), d.setMarkers(g, e.id), x(h, "markers", i, function(a, b) {
                            f(a, b)
                        })
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("maxbounds", ["$log", "leafletMapDefaults", "leafletBoundsHelpers", "leafletHelpers", function(a, b, c, d) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            link: function(a, b, e, f) {
                var g = f.getLeafletScope(),
                    h = c.isValidBounds,
                    i = d.isNumber;
                f.getMap().then(function(a) {
                    g.$watch("maxbounds", function(b) {
                        if (!h(b)) return void a.setMaxBounds();
                        var d = c.createLeafletBounds(b);
                        i(b.pad) && (d = d.pad(b.pad)), a.setMaxBounds(d), e.center || a.fitBounds(d)
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("paths", ["$log", "$q", "leafletData", "leafletMapDefaults", "leafletHelpers", "leafletPathsHelpers", "leafletEvents", function(a, b, c, d, e, f, g) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: ["leaflet", "?layers"],
            link: function(h, i, j, k) {
                var l = k[0],
                    m = e.isDefined,
                    n = e.isString,
                    o = l.getLeafletScope(),
                    p = o.paths,
                    q = f.createPath,
                    r = g.bindPathEvents,
                    s = f.setPathOptions;
                l.getMap().then(function(f) {
                    var g, h = d.getDefaults(j.id);
                    g = m(k[1]) ? k[1].getLayers : function() {
                        var a = b.defer();
                        return a.resolve(), a.promise
                    }, m(p) && g().then(function(b) {
                        var d = {};
                        c.setPaths(d, j.id);
                        var g = !m(j.watchPaths) || "true" === j.watchPaths,
                            i = function(a, c) {
                                var d = o.$watch('paths["' + c + '"]', function(c, e) {
                                    if (!m(c)) {
                                        if (m(e.layer))
                                            for (var g in b.overlays) {
                                                var h = b.overlays[g];
                                                h.removeLayer(a)
                                            }
                                        return f.removeLayer(a), void d()
                                    }
                                    s(a, c.type, c)
                                }, !0)
                            };
                        o.$watchCollection("paths", function(c) {
                            for (var j in d) m(c[j]) || (f.removeLayer(d[j]), delete d[j]);
                            for (var k in c)
                                if (0 !== k.search("\\$"))
                                    if (-1 === k.search("-")) {
                                        if (!m(d[k])) {
                                            var l = c[k],
                                                p = q(k, c[k], h);
                                            if (m(p) && m(l.message) && p.bindPopup(l.message), e.LabelPlugin.isLoaded() && m(l.label) && m(l.label.message) && p.bindLabel(l.label.message, l.label.options), m(l) && m(l.layer)) {
                                                if (!n(l.layer)) {
                                                    a.error("[AngularJS - Leaflet] A layername must be a string");
                                                    continue
                                                }
                                                if (!m(b)) {
                                                    a.error("[AngularJS - Leaflet] You must add layers to the directive if the markers are going to use this functionality.");
                                                    continue
                                                }
                                                if (!m(b.overlays) || !m(b.overlays[l.layer])) {
                                                    a.error('[AngularJS - Leaflet] A marker can only be added to a layer of type "group"');
                                                    continue
                                                }
                                                var t = b.overlays[l.layer];
                                                if (!(t instanceof L.LayerGroup || t instanceof L.FeatureGroup)) {
                                                    a.error('[AngularJS - Leaflet] Adding a marker to an overlay needs a overlay of the type "group" or "featureGroup"');
                                                    continue
                                                }
                                                d[k] = p, t.addLayer(p), g ? i(p, k) : s(p, l.type, l)
                                            } else m(p) && (d[k] = p, f.addLayer(p), g ? i(p, k) : s(p, l.type, l));
                                            r(p, k, l, o)
                                        }
                                    } else a.error('[AngularJS - Leaflet] The path name "' + k + '" is not valid. It must not include "-" and a number.')
                        })
                    })
                })
            }
        }
    }]), angular.module("leaflet-directive").directive("tiles", ["$log", "leafletData", "leafletMapDefaults", "leafletHelpers", function(a, b, c, d) {
        return {
            restrict: "A",
            scope: !1,
            replace: !1,
            require: "leaflet",
            link: function(e, f, g, h) {
                var i = d.isDefined,
                    j = h.getLeafletScope(),
                    k = j.tiles;
                return i(k) || i(k.url) ? void h.getMap().then(function(a) {
                    var d, e = c.getDefaults(g.id);
                    j.$watch("tiles", function(c) {
                        var f = e.tileLayerOptions,
                            h = e.tileLayer;
                        return !i(c.url) && i(d) ? void a.removeLayer(d) : i(d) ? i(c.url) && i(c.options) && !angular.equals(c.options, f) ? (a.removeLayer(d), f = e.tileLayerOptions, angular.copy(c.options, f), h = c.url, d = L.tileLayer(h, f), d.addTo(a), void b.setTiles(d, g.id)) : void(i(c.url) && d.setUrl(c.url)) : (i(c.options) && angular.copy(c.options, f), i(c.url) && (h = c.url), d = L.tileLayer(h, f), d.addTo(a), void b.setTiles(d, g.id))
                    }, !0)
                }) : void a.warn("[AngularJS - Leaflet] The 'tiles' definition doesn't have the 'url' property.")
            }
        }
    }]), ["markers", "geojson"].forEach(function(a) {
        angular.module("leaflet-directive").directive(a + "WatchOptions", ["$log", "$rootScope", "$q", "leafletData", "leafletHelpers", function(b, c, d, e, f) {
            var g = f.isDefined,
                h = f.errorHeader,
                i = f.isObject,
                j = f.watchOptions;
            return {
                restrict: "A",
                scope: !1,
                replace: !1,
                require: ["leaflet"],
                link: function(c, d, e, f) {
                    var k = f[0],
                        l = k.getLeafletScope();
                    k.getMap().then(function() {
                        g(c[a + "WatchOptions"]) && (i(c[a + "WatchOptions"]) ? angular.extend(j, c[a + "WatchOptions"]) : b.error(h + "[" + a + "WatchOptions] is not an object"), l[a + "WatchOptions"] = j)
                    })
                }
            }
        }])
    }), angular.module("leaflet-directive").factory("leafletEventsHelpers", ["$rootScope", "$q", "$log", "leafletHelpers", function(a, b, c, d) {
        var e = d.safeApply,
            f = d.isDefined,
            g = function(b, c, d, g, h, i, j, k) {
                e(b, function() {
                    var e = {
                        leafletEvent: g,
                        leafletObject: h,
                        modelName: j,
                        model: i
                    };
                    f(k) && angular.extend(e, {
                        layerName: k
                    }), "emit" === d ? b.$emit(c, e) : a.$broadcast(c, e)
                })
            };
        return {
            fire: g
        }
    }]), angular.module("leaflet-directive").factory("leafletLabelEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "leafletEventsHelpers", function(a, b, c, d, e) {
        var f = d,
            g = e.fire,
            h = function() {
                return ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu"]
            },
            i = function(a, b, c, d, e, f, h) {
                return function(e) {
                    var i = "leafletDirectiveLabel." + a,
                        j = scope_watch_name.replace("markers.", "");
                    g(c, i, b, e, d, f, j, h)
                }
            },
            j = function(a, b, c, d, e, g, j) {
                for (var k = h(), l = f.getObjectArrayPath("markers." + e), m = 0; m < k.length; m++) {
                    var a = k[m];
                    d.label.on(a, i(a, b, c, d.label, l, g, j))
                }
            };
        return {
            getAvailableLabelEvents: h,
            genDispatchLabelEvent: i,
            genLabelEvents: j
        }
    }]), angular.module("leaflet-directive").factory("leafletMapEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "leafletEventsHelpers", function(a, b, c, d, e) {
        var f = (d.safeApply, d.isDefined),
            g = (d.isObject, d.errorHeader, e.fire),
            h = function() {
                return ["click", "dblclick", "mousedown", "mouseup", "mouseover", "mouseout", "mousemove", "contextmenu", "focus", "blur", "preclick", "load", "unload", "viewreset", "movestart", "move", "moveend", "dragstart", "drag", "dragend", "zoomstart", "zoomend", "zoomlevelschange", "resize", "autopanstart", "layeradd", "layerremove", "baselayerchange", "overlayadd", "overlayremove", "locationfound", "locationerror", "popupopen", "popupclose", "draw:created", "draw:edited", "draw:deleted", "draw:drawstart", "draw:drawstop", "draw:editstart", "draw:editstop", "draw:deletestart", "draw:deletestop"]
            },
            i = function(a, b, c) {
                return function(d) {
                    var e = "leafletDirectiveMap." + b;
                    g(a, e, c, d, d.target, a)
                }
            },
            j = function(a) {
                a.$broadcast("boundsChanged")
            },
            k = function(a, b, c, d) {
                if (f(c.urlHashCenter)) {
                    var e = b.getCenter(),
                        g = e.lat.toFixed(4) + ":" + e.lng.toFixed(4) + ":" + b.getZoom();
                    f(d.c) && d.c === g || a.$emit("centerUrlHash", g)
                }
            };
        return {
            getAvailableMapEvents: h,
            genDispatchMapEvent: i,
            notifyCenterChangedToBounds: j,
            notifyCenterUrlHashChanged: k
        }
    }]), angular.module("leaflet-directive").factory("leafletMarkerEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "leafletEventsHelpers", "leafletLabelEvents", function(a, b, c, d, e, f) {
        var g = d.safeApply,
            h = d.isDefined,
            i = d.isObject,
            j = d,
            k = d.errorHeader,
            l = e.fire,
            m = f,
            n = function(b, c, d, e, f, h, i) {
                return function(j) {
                    var k = "leafletDirectiveMarker." + b;
                    "click" === b ? g(d, function() {
                        a.$broadcast("leafletDirectiveMarkersClick", f);

                    }) : "dragend" === b && (g(d, function() {
                        h.lat = e.getLatLng().lat, h.lng = e.getLatLng().lng
                    }), h.message && h.focus === !0 && e.openPopup()), l(d, k, c, j, j.target || e, h, f, i)
                }
            },
            o = function() {
                return ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu", "dragstart", "drag", "dragend", "move", "remove", "popupopen", "popupclose"]
            };
        return {
            getAvailableMarkerEvents: o,
            bindMarkerEvents: function(a, b, d, e, f) {
                var g, l, p = [],
                    q = "emit";
                if (h(e.eventBroadcast))
                    if (i(e.eventBroadcast))
                        if (h(e.eventBroadcast.marker))
                            if (i(e.eventBroadcast.marker)) {
                                void 0 !== e.eventBroadcast.marker.logic && null !== e.eventBroadcast.marker.logic && ("emit" !== e.eventBroadcast.marker.logic && "broadcast" !== e.eventBroadcast.marker.logic ? c.warn(k + "Available event propagation logic are: 'emit' or 'broadcast'.") : "emit" === e.eventBroadcast.marker.logic && (q = "emit"));
                                var r = !1,
                                    s = !1;
                                if (void 0 !== e.eventBroadcast.marker.enable && null !== e.eventBroadcast.marker.enable && "object" == typeof e.eventBroadcast.marker.enable && (r = !0), void 0 !== e.eventBroadcast.marker.disable && null !== e.eventBroadcast.marker.disable && "object" == typeof e.eventBroadcast.marker.disable && (s = !0), r && s) c.warn(k + "can not enable and disable events at the same time");
                                else if (r || s)
                                    if (r)
                                        for (g = 0; g < e.eventBroadcast.marker.enable.length; g++) l = e.eventBroadcast.marker.enable[g], -1 !== p.indexOf(l) ? c.warn(k + "This event " + l + " is already enabled") : -1 === o().indexOf(l) ? c.warn(k + "This event " + l + " does not exist") : p.push(l);
                                    else
                                        for (p = o(), g = 0; g < e.eventBroadcast.marker.disable.length; g++) {
                                            l = e.eventBroadcast.marker.disable[g];
                                            var t = p.indexOf(l); - 1 === t ? c.warn(k + "This event " + l + " does not exist or has been already disabled") : p.splice(t, 1)
                                        } else c.warn(k + "must enable or disable events")
                            } else c.warn(k + "event-broadcast.marker must be an object check your model.");
                else p = o();
                else c.error(k + "event-broadcast must be an object check your model.");
                else p = o();
                for (g = 0; g < p.length; g++) l = p[g], a.on(l, n(l, q, e, a, b, d, f));
                j.LabelPlugin.isLoaded() && h(a.label) && m.genLabelEvents(b, q, e, a, d, f)
            }
        }
    }]), angular.module("leaflet-directive").factory("leafletPathEvents", ["$rootScope", "$q", "$log", "leafletHelpers", "leafletLabelEvents", "leafletEventsHelpers", function(a, b, c, d, e, f) {
        var g = (d.safeApply, d.isDefined),
            h = d.isObject,
            i = d,
            j = d.errorHeader,
            k = e,
            l = f.fire,
            m = function(a, b, c, d, e, f, g) {
                return function(h) {
                    var i = "leafletDirectivePath." + a;
                    l(c, i, b, h, h.target || d, f, e, g)
                }
            },
            n = function(a, b, d, e) {
                var f, l, n = [],
                    p = "broadcast";
                if (g(e.eventBroadcast))
                    if (h(e.eventBroadcast))
                        if (g(e.eventBroadcast.path))
                            if (h(e.eventBroadcast.paths)) c.warn(j + "event-broadcast.path must be an object check your model.");
                            else {
                                void 0 !== e.eventBroadcast.path.logic && null !== e.eventBroadcast.path.logic && ("emit" !== e.eventBroadcast.path.logic && "broadcast" !== e.eventBroadcast.path.logic ? c.warn(j + "Available event propagation logic are: 'emit' or 'broadcast'.") : "emit" === e.eventBroadcast.path.logic && (p = "emit"));
                                var q = !1,
                                    r = !1;
                                if (void 0 !== e.eventBroadcast.path.enable && null !== e.eventBroadcast.path.enable && "object" == typeof e.eventBroadcast.path.enable && (q = !0), void 0 !== e.eventBroadcast.path.disable && null !== e.eventBroadcast.path.disable && "object" == typeof e.eventBroadcast.path.disable && (r = !0), q && r) c.warn(j + "can not enable and disable events at the same time");
                                else if (q || r)
                                    if (q)
                                        for (f = 0; f < e.eventBroadcast.path.enable.length; f++) l = e.eventBroadcast.path.enable[f], -1 !== n.indexOf(l) ? c.warn(j + "This event " + l + " is already enabled") : -1 === o().indexOf(l) ? c.warn(j + "This event " + l + " does not exist") : n.push(l);
                                    else
                                        for (n = o(), f = 0; f < e.eventBroadcast.path.disable.length; f++) {
                                            l = e.eventBroadcast.path.disable[f];
                                            var s = n.indexOf(l); - 1 === s ? c.warn(j + "This event " + l + " does not exist or has been already disabled") : n.splice(s, 1)
                                        } else c.warn(j + "must enable or disable events")
                            }
                else n = o();
                else c.error(j + "event-broadcast must be an object check your model.");
                else n = o();
                for (f = 0; f < n.length; f++) l = n[f], a.on(l, m(l, p, e, n, b));
                i.LabelPlugin.isLoaded() && g(a.label) && k.genLabelEvents(e, p, a, b)
            },
            o = function() {
                return ["click", "dblclick", "mousedown", "mouseover", "mouseout", "contextmenu", "add", "remove", "popupopen", "popupclose"]
            };
        return {
            getAvailablePathEvents: o,
            bindPathEvents: n
        }
    }])
}(angular);