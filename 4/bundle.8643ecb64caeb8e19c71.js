(()=>{var t={353:function(t){t.exports=function(){"use strict";var t=6e4,e=36e5,n="millisecond",s="second",i="minute",r="hour",a="day",o="week",l="month",u="quarter",c="year",d="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,f=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,v={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var s=String(t);return!s||s.length>=e?t:""+Array(e+1-s.length).join(n)+t},y={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),s=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(s,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var s=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(s,l),r=n-i<0,a=e.clone().add(s+(r?-1:1),l);return+(-(s+(n-i)/(r?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:l,y:c,w:o,d:a,D:d,h:r,m:i,s,ms:n,Q:u}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},_="en",g={};g[_]=v;var $="$isDayjsObject",w=function(t){return t instanceof x||!(!t||!t[$])},b=function t(e,n,s){var i;if(!e)return _;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(i=r),n&&(g[r]=n,i=r);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,i=o}return!s&&i&&(_=i),i||!s&&_},M=function(t,e){if(w(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new x(n)},D=y;D.l=b,D.i=w,D.w=function(t,e){return M(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var x=function(){function v(t){this.$L=b(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[$]=!0}var m=v.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var s=e.match(p);if(s){var i=s[2]-1||0,r=(s[7]||"0").substring(0,3);return n?new Date(Date.UTC(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)):new Date(s[1],i,s[3]||1,s[4]||0,s[5]||0,s[6]||0,r)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return D},m.isValid=function(){return!(this.$d.toString()===h)},m.isSame=function(t,e){var n=M(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return M(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<M(t)},m.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,u=!!D.u(e)||e,h=D.p(t),p=function(t,e){var s=D.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return u?s:s.endOf(a)},f=function(t,e){return D.w(n.toDate()[t].apply(n.toDate("s"),(u?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},v=this.$W,m=this.$M,y=this.$D,_="set"+(this.$u?"UTC":"");switch(h){case c:return u?p(1,0):p(31,11);case l:return u?p(1,m):p(0,m+1);case o:var g=this.$locale().weekStart||0,$=(v<g?v+7:v)-g;return p(u?y-$:y+(6-$),m);case a:case d:return f(_+"Hours",0);case r:return f(_+"Minutes",1);case i:return f(_+"Seconds",2);case s:return f(_+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var o,u=D.p(t),h="set"+(this.$u?"UTC":""),p=(o={},o[a]=h+"Date",o[d]=h+"Date",o[l]=h+"Month",o[c]=h+"FullYear",o[r]=h+"Hours",o[i]=h+"Minutes",o[s]=h+"Seconds",o[n]=h+"Milliseconds",o)[u],f=u===a?this.$D+(e-this.$W):e;if(u===l||u===c){var v=this.clone().set(d,1);v.$d[p](f),v.init(),this.$d=v.set(d,Math.min(this.$D,v.daysInMonth())).$d}else p&&this.$d[p](f);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[D.p(t)]()},m.add=function(n,u){var d,h=this;n=Number(n);var p=D.p(u),f=function(t){var e=M(h);return D.w(e.date(e.date()+Math.round(t*n)),h)};if(p===l)return this.set(l,this.$M+n);if(p===c)return this.set(c,this.$y+n);if(p===a)return f(1);if(p===o)return f(7);var v=(d={},d[i]=t,d[r]=e,d[s]=1e3,d)[p]||1,m=this.$d.getTime()+n*v;return D.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var s=t||"YYYY-MM-DDTHH:mm:ssZ",i=D.z(this),r=this.$H,a=this.$m,o=this.$M,l=n.weekdays,u=n.months,c=n.meridiem,d=function(t,n,i,r){return t&&(t[n]||t(e,s))||i[n].slice(0,r)},p=function(t){return D.s(r%12||12,t,"0")},v=c||function(t,e,n){var s=t<12?"AM":"PM";return n?s.toLowerCase():s};return s.replace(f,(function(t,s){return s||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return D.s(e.$y,4,"0");case"M":return o+1;case"MM":return D.s(o+1,2,"0");case"MMM":return d(n.monthsShort,o,u,3);case"MMMM":return d(u,o);case"D":return e.$D;case"DD":return D.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return d(n.weekdaysMin,e.$W,l,2);case"ddd":return d(n.weekdaysShort,e.$W,l,3);case"dddd":return l[e.$W];case"H":return String(r);case"HH":return D.s(r,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return v(r,a,!0);case"A":return v(r,a,!1);case"m":return String(a);case"mm":return D.s(a,2,"0");case"s":return String(e.$s);case"ss":return D.s(e.$s,2,"0");case"SSS":return D.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(n,d,h){var p,f=this,v=D.p(d),m=M(n),y=(m.utcOffset()-this.utcOffset())*t,_=this-m,g=function(){return D.m(f,m)};switch(v){case c:p=g()/12;break;case l:p=g();break;case u:p=g()/3;break;case o:p=(_-y)/6048e5;break;case a:p=(_-y)/864e5;break;case r:p=_/e;break;case i:p=_/t;break;case s:p=_/1e3;break;default:p=_}return h?p:D.a(p)},m.daysInMonth=function(){return this.endOf(l).$D},m.$locale=function(){return g[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),s=b(t,e,!0);return s&&(n.$L=s),n},m.clone=function(){return D.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},v}(),T=x.prototype;return M.prototype=T,[["$ms",n],["$s",s],["$m",i],["$H",r],["$W",a],["$M",l],["$y",c],["$D",d]].forEach((function(t){T[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),M.extend=function(t,e){return t.$i||(t(e,x,M),t.$i=!0),M},M.locale=b,M.isDayjs=w,M.unix=function(t){return M(1e3*t)},M.en=g[_],M.Ls=g,M.p={},M}()},522:function(t){t.exports=function(){"use strict";var t,e,n=1e3,s=6e4,i=36e5,r=864e5,a=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,o=31536e6,l=2628e6,u=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,c={years:o,months:l,days:r,hours:i,minutes:s,seconds:n,milliseconds:1,weeks:6048e5},d=function(t){return t instanceof _},h=function(t,e,n){return new _(t,n,e.$l)},p=function(t){return e.p(t)+"s"},f=function(t){return t<0},v=function(t){return f(t)?Math.ceil(t):Math.floor(t)},m=function(t){return Math.abs(t)},y=function(t,e){return t?f(t)?{negative:!0,format:""+m(t)+e}:{negative:!1,format:""+t+e}:{negative:!1,format:""}},_=function(){function f(t,e,n){var s=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),e)return h(t*c[p(e)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(e){s.$d[p(e)]=t[e]})),this.calMilliseconds(),this;if("string"==typeof t){var i=t.match(u);if(i){var r=i.slice(2).map((function(t){return null!=t?Number(t):0}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var m=f.prototype;return m.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(e,n){return e+(t.$d[n]||0)*c[n]}),0)},m.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=v(t/o),t%=o,this.$d.months=v(t/l),t%=l,this.$d.days=v(t/r),t%=r,this.$d.hours=v(t/i),t%=i,this.$d.minutes=v(t/s),t%=s,this.$d.seconds=v(t/n),t%=n,this.$d.milliseconds=t},m.toISOString=function(){var t=y(this.$d.years,"Y"),e=y(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var s=y(n,"D"),i=y(this.$d.hours,"H"),r=y(this.$d.minutes,"M"),a=this.$d.seconds||0;this.$d.milliseconds&&(a+=this.$d.milliseconds/1e3,a=Math.round(1e3*a)/1e3);var o=y(a,"S"),l=t.negative||e.negative||s.negative||i.negative||r.negative||o.negative,u=i.format||r.format||o.format?"T":"",c=(l?"-":"")+"P"+t.format+e.format+s.format+u+i.format+r.format+o.format;return"P"===c||"-P"===c?"P0D":c},m.toJSON=function(){return this.toISOString()},m.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",s={Y:this.$d.years,YY:e.s(this.$d.years,2,"0"),YYYY:e.s(this.$d.years,4,"0"),M:this.$d.months,MM:e.s(this.$d.months,2,"0"),D:this.$d.days,DD:e.s(this.$d.days,2,"0"),H:this.$d.hours,HH:e.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:e.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:e.s(this.$d.seconds,2,"0"),SSS:e.s(this.$d.milliseconds,3,"0")};return n.replace(a,(function(t,e){return e||String(s[t])}))},m.as=function(t){return this.$ms/c[p(t)]},m.get=function(t){var e=this.$ms,n=p(t);return"milliseconds"===n?e%=1e3:e="weeks"===n?v(e/c[n]):this.$d[n],e||0},m.add=function(t,e,n){var s;return s=e?t*c[p(e)]:d(t)?t.$ms:h(t,this).$ms,h(this.$ms+s*(n?-1:1),this)},m.subtract=function(t,e){return this.add(t,e,!0)},m.locale=function(t){var e=this.clone();return e.$l=t,e},m.clone=function(){return h(this.$ms,this)},m.humanize=function(e){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!e)},m.valueOf=function(){return this.asMilliseconds()},m.milliseconds=function(){return this.get("milliseconds")},m.asMilliseconds=function(){return this.as("milliseconds")},m.seconds=function(){return this.get("seconds")},m.asSeconds=function(){return this.as("seconds")},m.minutes=function(){return this.get("minutes")},m.asMinutes=function(){return this.as("minutes")},m.hours=function(){return this.get("hours")},m.asHours=function(){return this.as("hours")},m.days=function(){return this.get("days")},m.asDays=function(){return this.as("days")},m.weeks=function(){return this.get("weeks")},m.asWeeks=function(){return this.as("weeks")},m.months=function(){return this.get("months")},m.asMonths=function(){return this.as("months")},m.years=function(){return this.get("years")},m.asYears=function(){return this.as("years")},f}(),g=function(t,e,n){return t.add(e.years()*n,"y").add(e.months()*n,"M").add(e.days()*n,"d").add(e.hours()*n,"h").add(e.minutes()*n,"m").add(e.seconds()*n,"s").add(e.milliseconds()*n,"ms")};return function(n,s,i){t=i,e=i().$utils(),i.duration=function(t,e){var n=i.locale();return h(t,{$l:n},e)},i.isDuration=d;var r=s.prototype.add,a=s.prototype.subtract;s.prototype.add=function(t,e){return d(t)?g(this,t,1):r.bind(this)(t,e)},s.prototype.subtract=function(t,e){return d(t)?g(this,t,-1):a.bind(this)(t,e)}}}()},750:function(t){t.exports=function(){"use strict";var t={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"};return function(e,n,s){var i=n.prototype,r=i.format;s.en.formats=t,i.format=function(e){void 0===e&&(e="YYYY-MM-DDTHH:mm:ssZ");var n=this.$locale().formats,s=function(e,n){return e.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,(function(e,s,i){var r=i&&i.toUpperCase();return s||n[i]||t[i]||n[r].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,(function(t,e,n){return e||n.slice(1)}))}))}(e,void 0===n?{}:n);return r.call(this,s)}}}()},279:function(t){t.exports=function(){"use strict";return function(t,e,n){t=t||{};var s=e.prototype,i={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function r(t,e,n,i){return s.fromToBase(t,e,n,i)}n.en.relativeTime=i,s.fromToBase=function(e,s,r,a,o){for(var l,u,c,d=r.$locale().relativeTime||i,h=t.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],p=h.length,f=0;f<p;f+=1){var v=h[f];v.d&&(l=a?n(e).diff(r,v.d,!0):r.diff(e,v.d,!0));var m=(t.rounding||Math.round)(Math.abs(l));if(c=l>0,m<=v.r||!v.r){m<=1&&f>0&&(v=h[f-1]);var y=d[v.l];o&&(m=o(""+m)),u="string"==typeof y?y.replace("%d",m):y(m,s,v.l,c);break}}if(s)return u;var _=c?d.future:d.past;return"function"==typeof _?_(u):_.replace("%s",u)},s.to=function(t,e){return r(t,e,this,!0)},s.from=function(t,e){return r(t,e,this)};var a=function(t){return t.$u?n.utc():n()};s.toNow=function(t){return this.to(a(this),t)},s.fromNow=function(t){return this.from(a(this),t)}}}()}},e={};function n(s){var i=e[s];if(void 0!==i)return i.exports;var r=e[s]={exports:{}};return t[s].call(r.exports,r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";function t(t,e,n="beforeend"){e.insertAdjacentElement(n,t.element)}class e{#t=null;get element(){return this.#t??=function(t){const e=document.createElement("div");return e.innerHTML=t,e.firstElementChild}(this.template),this.#t}removeElement(){this.#t=null}}class s extends e{get template(){return'<section class="trip-main__trip-info  trip-info">\n            <div class="trip-info__main">\n              <h1 class="trip-info__title">Amsterdam &mdash; Chamonix &mdash; Geneva</h1>\n\n              <p class="trip-info__dates">18&nbsp;&mdash;&nbsp;20 Mar</p>\n            </div>\n\n            <p class="trip-info__cost">\n              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>\n            </p>\n          </section>'}}class i extends e{get template(){return'\n  <form class="trip-filters" action="#" method="get">\n  <div class="trip-filters__filter">\n    <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything">\n    <label class="trip-filters__filter-label" for="filter-everything">Everything</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future">\n    <label class="trip-filters__filter-label" for="filter-future">Future</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-present" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="present">\n    <label class="trip-filters__filter-label" for="filter-present">Present</label>\n  </div>\n\n  <div class="trip-filters__filter">\n    <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" checked>\n    <label class="trip-filters__filter-label" for="filter-past">Past</label>\n  </div>\n\n  <button class="visually-hidden" type="submit">Accept filter</button>\n</form>'}}class r extends e{get template(){return'<form class="trip-events__trip-sort  trip-sort" action="#" method="get">\n  <div class="trip-sort__item  trip-sort__item--day">\n    <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">\n    <label class="trip-sort__btn" for="sort-day">Day</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--event">\n    <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event" disabled>\n    <label class="trip-sort__btn" for="sort-event">Event</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--time">\n    <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">\n    <label class="trip-sort__btn" for="sort-time">Time</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--price">\n    <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price" checked>\n    <label class="trip-sort__btn" for="sort-price">Price</label>\n  </div>\n\n  <div class="trip-sort__item  trip-sort__item--offer">\n    <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer" disabled>\n    <label class="trip-sort__btn" for="sort-offer">Offers</label>\n  </div>\n</form>'}}class a extends e{get template(){return'<ul class="trip-events__list" id = "event_list"> </ul>'}}class o extends e{get template(){return'<li class="trip-events__item"></li>'}}class l extends e{get template(){return'<div class="event"></div>'}}var u=n(353),c=n.n(u);class d extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{dateFrom:e}=t;return`<time class="event__date" datetime="${e}">${c()(e).format("MMM DD")}</time>`}(this.event)}}class h extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{type:e}=t;return`<div class="event__type">\n    <img class="event__type-icon" width="42" height="42" src="img/icons/${e}.png" alt="Event type icon">\n  </div>`}(this.event)}}const p=t=>t.charAt(0).toUpperCase()+t.slice(1),f=(t,e,n)=>t===e?n:"";class v extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{type:e,destination:{name:n}}=t;return`<h3 class="event__title">${p(e)} ${n}</h3>`}(this.event)}}class m extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{dateFrom:e,dateTo:n}=t,s=e.format("HH:mm"),i=n.format("HH:mm");return`<div class="event__schedule">\n  <p class="event__time">\n    <time class="event__start-time" datetime="${e}">${s}</time>\n    &mdash;\n    <time class="event__end-time" datetime="${n}">${i}</time>\n  </p>\n  <p class="event__duration">${(()=>{const t=c().duration(n.diff(e)).format("HH mm").split(" "),s=t[0],i=t[1];let r=`${i} M`;return"00"!==s&&(r=`${s}H ${i}M`),r})()}</p>\n</div>`}(this.event)}}class y extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{basePrice:e}=t;return`<p class="event__price">\n  &euro;&nbsp;<span class="event__price-value">${e}</span>\n</p>`}(this.event)}}class _ extends e{get template(){return' <h4 class="visually-hidden">Offers:</h4>'}}class g extends e{get template(){return'<ul class="event__selected-offers"></ul>'}}class $ extends e{offer;constructor(t){super(),this.offer=t}get template(){return function(t){const{title:e,price:n}=t;return`<li class="event__offer">\n  <span class="event__offer-title">${e}</span>\n  &plus;&euro;&nbsp;\n  <span class="event__offer-price">${n}</span>\n</li>`}(this.offer)}}class w extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{isFavorite:e}=t;return`<button class="event__favorite-btn ${e?"event__favorite-btn--active":""}" type="button">\n  <span class="visually-hidden">Add to favorite</span>\n  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">\n    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>\n  </svg>\n</button>`}(this.event)}}class b extends e{get template(){return'<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>'}}class M{waypointItemContainer;waypointsModel;waypoint;eventDate;eventItemContainer;offers;eventOffersList;constructor({waypointItemContainer:t,waypointsModel:e,waypoint:n}){this.waypointItemContainer=t,this.waypointsModel=e,this.waypoint=n,this.eventDate=new d(this.waypoint),this.eventItemContainer=new l,this.offers=this.waypoint.offers,this.eventOffersList=new g}init(){t(this.eventItemContainer,this.waypointItemContainer),t(new d(this.waypoint),this.eventItemContainer.element),t(new h(this.waypoint),this.eventItemContainer.element),t(new v(this.waypoint),this.eventItemContainer.element),t(new m(this.waypoint),this.eventItemContainer.element),t(new y(this.waypoint),this.eventItemContainer.element),t(new _,this.eventItemContainer.element),t(this.eventOffersList,this.eventItemContainer.element);for(let e=0;e<this.offers.length;e++){const n=this.offers[e];t(new $(n),this.eventOffersList.element)}t(new w(this.waypoint),this.eventItemContainer.element),t(new b,this.eventItemContainer.element)}}class D extends e{get template(){return'<form class="event event--edit" action="#" method="post"></form>'}}class x extends e{get template(){return'<header class="event__header"></header>'}}class T extends e{get template(){return'<div class="event__type-wrapper"></div>'}}class L extends e{get template(){return'<label class="event__type  event__type-btn" for="event-type-toggle-1"></label>'}}class S extends e{get template(){return'<span class="visually-hidden">Choose event type</span>'}}class I extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{type:e}=t;return`<img class="event__type-icon" width="17" height="17"\n  src="img/icons/${e}.png" alt="Event type icon">`}(this.event)}}class C extends e{get template(){return'<input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">'}}class Y extends e{get template(){return'<div class="event__type-list"></div>'}}class H extends e{get template(){return'<fieldset class="event__type-group">\n<legend class="visually-hidden">Event type</legend>\n</fieldset>'}}const O=["taxi","bus","train","ship","drive","flight","check-in","sightseeing","restaurant"];class k extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{type:e}=t;return`<div>${(t=>O.reduce(((e,n)=>e+((t,e)=>{const n=p(e);return`<div class="event__type-item">\n  <input id="event-type-${e}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${e}" ${f(t,e,"checked")}>\n  <label class="event__type-label  event__type-label--${e}" for="event-type-${e}-1">${n}</label>\n</div>`})(t,n)),""))(e)}</div>`}(this.event)}}class A extends e{get template(){return'<div class="event__field-group  event__field-group--destination"></div>'}}class P extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{type:e}=t;return`<label class="event__label  event__type-output" for="event-destination-1">${p(e)}</label>`}(this.event)}}class E extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{destination:{name:e}}=t;return`<input class="event__input  event__input--destination" id="event-destination-1"\n  type="text" name="event-destination" value="${p(e)}" list="destination-list-1"></div>`}(this.event)}}class W extends e{get template(){return'<datalist id="destination-list-1"></datalist>'}}const F=["Amsterdam","London","Chamonix","Geneva"],j=["Lorem ipsum dolor sit amet, consectetur adipiscing elit.","Cras aliquet varius magna, non porta ligula feugiat eget.","Fusce tristique felis at fermentum pharetra.","Aliquam id orci ut lectus varius viverra.","Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.","Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.","Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.","Sed sed nisi sed augue convallis suscipit in sed felis.","Aliquam erat volutpat.","Nunc fermentum tortor ac porta dapibus.","In rutrum ac purus sit amet tempus."],N=["Add breakfast","Book tickets","Lunch in city","Add luggage","Switch to comfort","Order Uber","Rent a car"],q=(c()(),c()().add(3,"day").add(4,"hours").add(15,"minute"),t=>F.reduce(((e,n)=>e+((t,e)=>`<option value="${t}"${()=>f(t,e,"checked")}></option>`)(t,n)),""));class U extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{destination:{name:e}}=t;return`<div>${q(e)}</div>`}(this.event)}}class B extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{dateFrom:e,dateTo:n}=t;return`<div class="event__field-group  event__field-group--time">\n  <label class="visually-hidden" for="event-start-time-1">${e}</label>\n  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${c()(e).format("DD/MM/YY HH:mm")}">\n  &mdash;\n  <label class="visually-hidden" for="event-end-time-1">${n}</label>\n  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${c()(n).format("DD/MM/YY HH:mm")}">\n  </div>`}(this.event)}}class G extends e{event;constructor(t){super(),this.event=t}get template(){return function(t){const{basePrice:e}=t;return`<div class="event__field-group  event__field-group--price">\n  <label class="event__label" for="event-price-1">\n    <span class="visually-hidden">Price</span>\n    &euro;\n  </label>\n  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${e}">\n  </div>`}(this.event)}}class Z extends e{get template(){return'<button class="event__save-btn  btn  btn--blue" type="submit">Save</button>'}}class z extends e{get template(){return'<button class="event__reset-btn" type="reset">Delete</button>'}}class J extends e{get template(){return'\n<section class="event__details"></section>'}}class R extends e{get template(){return'<section class="event__section  event__section--offers">\n<h3 class="event__section-title  event__section-title--offers">Offers</h3>\n</section>'}}class V extends e{get template(){return'<div class="event__available-offers"></div>'}}class Q extends e{offer;constructor({offer:t}){super(),this.offer=t}get template(){return function(t){const{id:e,title:n,price:s}=t;return`<div class="event__offer-selector">\n  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${e}-1" type="checkbox" name="event-offer-${e}">\n  <label class="event__offer-label" for="event-offer-${e}-1">\n    <span class="event__offer-title">${n}</span>\n    &plus;&euro;&nbsp;\n    <span class="event__offer-price">${s}</span>\n  </label>\n</div>`}(this.offer)}}class K extends e{destination;constructor({destination:t}){super(),this.destination=t}get template(){return function(t){const{description:e}=t;return`<section class="event__section  event__section--destination">\n  <h3 class="event__section-title  event__section-title--destination">Destination</h3>\n  <p class="event__destination-description">${e}</p>\n  </div>\n  </section>`}(this.destination)}}class X extends e{get template(){return'<div class="event__photos-container"></div>'}}class tt extends e{get template(){return'<div class="event__photos-tape"></div></div>'}}class et extends e{waypoint;constructor(t){super(),this.waypoint=t}get template(){return function(t){const{src:e}=t;return`<img class="event__photo" src="${e}" alt="Event photo">`}(this.waypoint)}}class nt{editWaypointContainer;waypointsModel;waypoint;editItemContainer;waypointContainer;eventHeader;eventTypeWrapper;eventTypeLabel;chooseEventType;eventTypeIcon;eventTypeToggle;eventTypeList;eventTypeGroup;eventTypeItem;eventDestination;eventLabelDestination;eventInputDestination;eventDestinationList;eventDestinationListItem;eventTime;eventPrice;eventSave;eventDelete;eventRollup;eventDetails;offersSection;offersList;offers;destinationDescription;picturesContainer;pictures;destinationPicturesList;constructor({editWaypointContainer:t,waypointsModel:e,waypoint:n}){this.editWaypointContainer=t,this.waypointsModel=e,this.waypoint=n,this.waypointContainer=new o,this.editItemContainer=new D,this.eventHeader=new x,this.eventTypeWrapper=new T,this.eventTypeLabel=new L,this.chooseEventType=new S,this.eventTypeIcon=new I(this.waypoint),this.eventTypeToggle=new C,this.eventTypeList=new Y,this.eventTypeGroup=new H,this.eventTypeItem=new k(this.waypoint),this.eventDestination=new A,this.eventLabelDestination=new P(this.waypoint),this.eventInputDestination=new E(this.waypoint),this.eventDestinationList=new W,this.eventDestinationListItem=new U(this.waypoint),this.eventTime=new B(this.waypoint),this.eventPrice=new G(this.waypoint),this.eventSave=new Z,this.eventDelete=new z,this.eventRollup=new b,this.eventDetails=new J,this.offersSection=new R,this.offersList=new V,this.offers=this.waypoint.offers,this.destinationDescription=new K(this.waypoint),this.picturesContainer=new X,this.pictures=this.waypoint.destination.pictures,this.destinationPicturesList=new tt}init(){t(this.waypointContainer,this.editWaypointContainer),t(this.editItemContainer,this.waypointContainer.element),t(this.eventHeader,this.editItemContainer.element),t(this.eventTypeWrapper,this.eventHeader.element),t(this.eventTypeLabel,this.eventTypeWrapper.element),t(this.chooseEventType,this.eventTypeLabel.element),t(this.eventTypeIcon,this.eventTypeLabel.element),t(this.eventTypeToggle,this.eventTypeWrapper.element),t(this.eventTypeList,this.eventTypeWrapper.element),t(this.eventTypeGroup,this.eventTypeList.element),t(this.eventTypeItem,this.eventTypeGroup.element),t(this.eventTypeItem,this.eventTypeGroup.element),t(this.eventDestination,this.eventHeader.element),t(this.eventLabelDestination,this.eventDestination.element),t(this.eventInputDestination,this.eventDestination.element),t(this.eventDestinationList,this.eventDestination.element),t(this.eventDestinationListItem,this.eventDestinationList.element),t(this.eventTime,this.eventHeader.element),t(this.eventPrice,this.eventHeader.element),t(this.eventSave,this.eventHeader.element),t(this.eventDelete,this.eventHeader.element),t(this.eventRollup,this.eventHeader.element),t(this.eventDetails,this.editItemContainer.element),t(this.offersSection,this.eventDetails.element),t(this.offersList,this.offersSection.element);for(let e=0;e<this.offers.length;e++){const n=this.offers[e];t(new Q({offer:n}),this.offersList.element)}t(this.destinationDescription,this.eventDetails.element),t(this.picturesContainer,this.eventDetails.element),t(this.destinationPicturesList,this.picturesContainer.element);for(let e=0;e<this.pictures.length;e++){const n=this.pictures[e];t(new et(n),this.destinationPicturesList.element)}}}const st=document.querySelector(".trip-main"),it=document.querySelector(".trip-controls__filters");class rt{static getInteger=(t=0,e=100)=>{const n=Math.ceil(Math.min(t,e)),s=Math.floor(Math.max(t,e)),i=Math.random()*(s-n+1)+n;return Math.floor(i)};static getArrayElement(t){return t[Math.floor(Math.random()*t.length)]}static get boolean(){const t=this.getInteger(0,1);return Boolean(t)}}var at=n(522),ot=n.n(at),lt=n(279),ut=n.n(lt),ct=n(750),dt=n.n(ct);c().extend(ot()),c().extend(ut()),c().extend(dt());const ht=c();function pt(){return{dateFrom:ht().subtract(rt.getInteger(0,7),"day").subtract(rt.getInteger(0,23),"hour").subtract(rt.getInteger(0,59),"minute"),dateTo:ht().add(rt.getInteger(0,7),"day").add(rt.getInteger(0,23),"hour").add(rt.getInteger(0,59),"minute")}}const ft=()=>Array.from({length:rt.getInteger(0,5)},(()=>rt.getArrayElement(j))).join(" "),vt=t=>({id:`${rt.getInteger()}`,description:ft(),name:rt.getArrayElement(F),pictures:Array.from({length:rt.getInteger(2,5)},(()=>(t=>({src:`https://loremflickr.com/248/152?${t}=${rt.getInteger()}`,description:ft()}))(t)))}),mt=()=>({id:`${rt.getInteger()}`,title:`${rt.getArrayElement(N)}`,price:rt.getInteger(20,100)}),yt=()=>({id:`${rt.getInteger()}`,basePrice:rt.getInteger(100,5e3),dateFrom:pt().dateFrom,dateTo:pt().dateTo,destination:rt.getArrayElement(F.map(vt)),isFavorite:rt.boolean,offers:Array.from({length:rt.getInteger(0,5)},mt),type:rt.getArrayElement(O)}),_t=document.querySelector(".trip-events"),gt=new class{#e=Array.from({length:5},yt);get waypoints(){return this.#e}},$t=new class{listContainer;waypointsModel;waypointList=new a;waypoints;waypoint;offers;constructor({listContainer:t,waypointsModel:e}){this.listContainer=t,this.waypointsModel=e,this.waypoints=[...this.waypointsModel.waypoints],this.waypoint=new o}init(){t(new s,st,"afterbegin"),t(new i,it),t(new r,this.listContainer),t(this.waypointList,this.listContainer);const e=this.waypoints[0];new nt({editWaypointContainer:this.waypointList.element,waypointsModel:this.waypointsModel,waypoint:e}).init();for(let e=0;e<this.waypoints.length;e++){const n=this.waypoints[e];t(new o,this.waypointList.element);const s=document.getElementById("event_list"),i=Array.from(s.children)[e];new M({waypointItemContainer:i,waypointsModel:this.waypointsModel,waypoint:n}).init()}}}({listContainer:_t,waypointsModel:gt});$t.init()})()})();
//# sourceMappingURL=bundle.8643ecb64caeb8e19c71.js.map