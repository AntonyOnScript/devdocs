"use strict";(self.webpackChunkdevdocs=self.webpackChunkdevdocs||[]).push([[41582],{20262:function(e,t,n){n.r(t),n.d(t,{assets:function(){return m},contentTitle:function(){return p},default:function(){return h},frontMatter:function(){return r},metadata:function(){return d},toc:function(){return c}});var a=n(83117),o=n(80102),l=(n(67294),n(3905)),i=n(13904),s=["components"],r={title:"Translating Moodle App",sidebar_label:"Moodle App",sidebar_position:6,tags:["Moodle App","Processes","Translation","Language"]},p=void 0,d={unversionedId:"development/process/translation/moodleapp",id:"development/process/translation/moodleapp",title:"Translating Moodle App",description:"The Moodle App is being translated into more and more languages! Check out the latest translation stats.",source:"@site/general/development/process/translation/moodleapp.md",sourceDirName:"development/process/translation",slug:"/development/process/translation/moodleapp",permalink:"/devdocs/general/development/process/translation/moodleapp",draft:!1,editUrl:"https://github.com/moodle/devdocs/edit/main/general/development/process/translation/moodleapp.md",tags:[{label:"Moodle App",permalink:"/devdocs/general/tags/moodle-app"},{label:"Processes",permalink:"/devdocs/general/tags/processes"},{label:"Translation",permalink:"/devdocs/general/tags/translation"},{label:"Language",permalink:"/devdocs/general/tags/language"}],version:"current",lastUpdatedBy:"ferranrecio",lastUpdatedAt:1655463643,formattedLastUpdatedAt:"17/06/2022",sidebarPosition:6,frontMatter:{title:"Translating Moodle App",sidebar_label:"Moodle App",sidebar_position:6,tags:["Moodle App","Processes","Translation","Language"]},sidebar:"process",previous:{title:"Plugins",permalink:"/devdocs/general/development/process/translation/plugins"},next:{title:"Moodle docs",permalink:"/devdocs/general/development/process/translation/docs"}},m={},c=[{value:"How do I translate words and phrases used in the Moodle App?",id:"how-do-i-translate-words-and-phrases-used-in-the-moodle-app",level:2},{value:"Advanced selection of strings",id:"advanced-selection-of-strings",level:3},{value:"I am not a language pack maintainer. How can I contribute a translation?",id:"i-am-not-a-language-pack-maintainer-how-can-i-contribute-a-translation",level:2},{value:"When will the translated strings be shown in the Moodle App?",id:"when-will-the-translated-strings-be-shown-in-the-moodle-app",level:2},{value:"My language does not appear in the app",id:"my-language-does-not-appear-in-the-app",level:2},{value:"How can I translate my plugin?",id:"how-can-i-translate-my-plugin",level:2}],u={toc:c};function h(e){var t=e.components,n=(0,o.Z)(e,s);return(0,l.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(i.Z,(0,a.Z)({frontMatter:r},void 0!==d?{metadata:d}:{},{mdxType:"MoodlePageBanner"})),(0,l.kt)("p",null,"The Moodle App is being translated into more and more languages! Check out ",(0,l.kt)("a",{parentName:"p",href:"https://moodle.org/plugins/translations.php?plugin=local_moodlemobileapp"},"the latest translation stats"),"."),(0,l.kt)("h2",{id:"how-do-i-translate-words-and-phrases-used-in-the-moodle-app"},"How do I translate words and phrases used in the Moodle App?"),(0,l.kt)("p",null,"To help with translating, you first need to create an account on the ",(0,l.kt)("a",{parentName:"p",href:"http://lang.moodle.org"},"Moodle translation site"),"."),(0,l.kt)("p",null,"Moodle App strings may be found using this filter: ",(0,l.kt)("a",{parentName:"p",href:"https://lang.moodle.org/local/amos/view.php?t=1&v=l&l=&c=*app&s&d&m=1&a=1"},"https://lang.moodle.org/local/amos/view.php?t=1&v=l&l=&c=*app&s&d&m=1&a=1")),(0,l.kt)("p",null,'Just select the desired language and click "Save filter" to display them.'),(0,l.kt)("h3",{id:"advanced-selection-of-strings"},"Advanced selection of strings"),(0,l.kt)("p",null,"All strings used in the app are indexed in ",(0,l.kt)("a",{parentName:"p",href:"https://github.com/moodlehq/moodleapp/blob/master/scripts/langindex.json"},"the langindex.json file"),"."),(0,l.kt)("p",null,"They have the following format:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},'"{module}.{string-identifier}": "{component}"')," \u2014 In this case the string will be translated using the ",(0,l.kt)("inlineCode",{parentName:"li"},"{string-identifier}")," on the ",(0,l.kt)("inlineCode",{parentName:"li"},"{component}")," file."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},'"{module}.{string-identifier}": "{component}/{component-string}"')," \u2014 In this case the string will be translated using the ",(0,l.kt)("inlineCode",{parentName:"li"},"{component-string}")," on the ",(0,l.kt)("inlineCode",{parentName:"li"},"{component}")," file.")),(0,l.kt)("p",null,"Some examples are:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},'"addon.block_recentlyaccessedcourses.nocourses": "block_recentlyaccessedcourses"')," \u2014 This means it will use the ",(0,l.kt)("inlineCode",{parentName:"li"},"nocourses")," translation from the ",(0,l.kt)("inlineCode",{parentName:"li"},"block_recentlyaccessedcourses")," component in AMOS."),(0,l.kt)("li",{parentName:"ul"},(0,l.kt)("inlineCode",{parentName:"li"},'"addon.mod_workshop.yourassessment": "workshop/assessmentbyyourself"')," \u2014 This means it will use the ",(0,l.kt)("inlineCode",{parentName:"li"},"assessmentbyyourself")," string from the ",(0,l.kt)("inlineCode",{parentName:"li"},"workshop")," component in AMOS.")),(0,l.kt)("p",null,"The ",(0,l.kt)("inlineCode",{parentName:"p"},"local_moodlemobileapp"),' component has the specific strings of the Moodle App, but most of the strings are located in other components. To select all the Moodle App strings, click on "Moodle App" below the components selector. This action will auto-select the following:'),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Last version available option (it is selected by default). The propagation to other version is done automatically."),(0,l.kt)("li",{parentName:"ul"},"Components used in the App."),(0,l.kt)("li",{parentName:"ul"},"Only strings that are being used in the Moodle App: This will filter only the strings used in every component on the app.")),(0,l.kt)("p",null,"Additionally, you will see a little mobile in the strings used in the app. Hovering over this icon, you can read the string identifier in the app."),(0,l.kt)("h2",{id:"i-am-not-a-language-pack-maintainer-how-can-i-contribute-a-translation"},"I am not a language pack maintainer. How can I contribute a translation?"),(0,l.kt)("p",null,"The process is the same as for core Moodle. See ",(0,l.kt)("a",{parentName:"p",href:"/general/development/process/translation/contributing"},"Contributing a translation"),"."),(0,l.kt)("p",null,"Note: Please contact the maintainer of your language pack as listed in the ",(0,l.kt)("a",{parentName:"p",href:"http://lang.moodle.org/local/amos/credits.php"},"Translation credits")," to tell them that you are translating the Moodle App. If you don't receive a reply within a reasonable time, contact our Moodle translation coordinator, Koen Roggemans, at ",(0,l.kt)("a",{parentName:"p",href:"mailto:translation@moodle.org"},"translation@moodle.org"),"."),(0,l.kt)("h2",{id:"when-will-the-translated-strings-be-shown-in-the-moodle-app"},"When will the translated strings be shown in the Moodle App?"),(0,l.kt)("p",null,"Translations are not automatically synchronised with the app, you will have to wait to the next release to see your latest contributions."),(0,l.kt)("h2",{id:"my-language-does-not-appear-in-the-app"},"My language does not appear in the app"),(0,l.kt)("p",null,"Only some languages are available in the app, the selection is done using the following criteria:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"Over 75% of the strings used in the app are available in the language and more than 50 strings are from the ",(0,l.kt)("inlineCode",{parentName:"li"},"local_moodlemobileapp")," component."),(0,l.kt)("li",{parentName:"ul"},"Over 50% of the strings used in the app are available in the language and more than 75 strings are from the ",(0,l.kt)("inlineCode",{parentName:"li"},"local_moodlemobileapp")," component.")),(0,l.kt)("p",null,"This is done to ensure translations are rich enough."),(0,l.kt)("h2",{id:"how-can-i-translate-my-plugin"},"How can I translate my plugin?"),(0,l.kt)("p",null,"If you are developing a plugin, you'll have to indicate which strings you want to use in the ",(0,l.kt)("inlineCode",{parentName:"p"},"lang")," configuration option. You can learn more about this in the ",(0,l.kt)("a",{parentName:"p",href:"/docs/moodleapp/development/plugins-development-guide"},"Moodle App Plugins development guide"),"."))}h.isMDXComponent=!0}}]);