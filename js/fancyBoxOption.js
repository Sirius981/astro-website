jQuery(function($){
  // The category selector jQuery script
  $(".filter").on("click", function () {
    var $this = $(this);
    // if we click the active tab, do nothing
    if (!$this.hasClass("active")) {
      $(".filter").removeClass("active");
      $this.addClass("active"); // set the active tab
      var $filter = $this.data("rel"); // get the data-rel value from selected tab and set as filter
      $filter == 'all' ? // if we select "view all", return to initial settings and show all
        $(".fancybox").attr("data-fancybox-group", "gallery").not(":visible").fadeIn() 
        : // otherwise
        $(".fancybox").fadeOut(0).filter(function () { 
          return $(this).data("filter") == $filter; // set data-filter value as the data-rel value of selected tab
        }).attr("data-fancybox-group", $filter).fadeIn(1000); // set data-fancybox-group and show filtered elements
    } // if
  }); // on
  
  
  
  //Fancybox Option
  $(".fancybox").fancybox({
	// Enable infinite gallery navigation
	loop : false,

	// Space around image, ignored if zoomed-in or viewport smaller than 800px
	margin : [44, 0],

	// Horizontal space between slides
	gutter : 50,

	// Enable keyboard navigation
	keyboard : true,

	// Should display navigation arrows at the screen edges
	arrows : true,

	// Should display infobar (counter and arrows at the top)
	infobar : false,

	// Should display toolbar (buttons at the top)
	toolbar : true,

	// What buttons should appear in the top right corner.
	// Buttons will be created using templates from `btnTpl` option
	// and they will be placed into toolbar (class="fancybox-toolbar"` element)
	buttons : [
		'slideShow',
		'fullScreen',
		'thumbs',
		'close'
	],

	// Detect "idle" time in seconds
	idleTime : 4,

	// Should display buttons at top right corner of the content
	// If 'auto' - they will be created for content having type 'html', 'inline' or 'ajax'
	// Use template from `btnTpl.smallBtn` for customization
	smallBtn : 'auto',

	// Disable right-click and use simple image protection for images
	protect : true,

	// Shortcut to make content "modal" - disable keyboard navigtion, hide buttons, etc
	modal : false,

	image : {

		// Wait for images to load before displaying
		// Requires predefined image dimensions
		// If 'auto' - will zoom in thumbnail if 'width' and 'height' attributes are found
		preload : "auto",

	},

	ajax : {

		// Object containing settings for ajax request
		settings : {

			// This helps to indicate that request comes from the modal
			// Feel free to change naming
			data : {
				fancybox : true
			}
		}

	},

	iframe : {

		// Iframe template
		tpl : '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',

		// Preload iframe before displaying it
		// This allows to calculate iframe content width and height
		// (note: Due to "Same Origin Policy", you can't get cross domain data).
		preload : true,

		// Custom CSS styling for iframe wrapping element
		// You can use this to set custom iframe dimensions
		css : {},

		// Iframe tag attributes
		attr : {
			scrolling : 'auto'
		}

	},

	// Open/close animation type
	// Possible values:
	//   false            - disable
	//   "zoom"           - zoom images from/to thumbnail
	//   "fade"
	//   "zoom-in-out"
	//
	animationEffect : "zoom",

	// Duration in ms for open/close animation
	animationDuration : 366,

	// Should image change opacity while zooming
	// If opacity is 'auto', then opacity will be changed if image and thumbnail have different aspect ratios
	zoomOpacity : 'auto',

	// Transition effect between slides
	//
	// Possible values:
	//   false            - disable
	//   "fade'
	//   "slide'
	//   "circular'
	//   "tube'
	//   "zoom-in-out'
	//   "rotate'
	//
	transitionEffect : "fade",

	// Duration in ms for transition animation
	transitionDuration : 366,

	// Custom CSS class for slide element
	slideClass : '',

	// Custom CSS class for layout
	baseClass : '',

	// Base template for layout
	baseTpl	:
		'<div class="fancybox-container" role="dialog" tabindex="-1">' +
			'<div class="fancybox-bg"></div>' +
			'<div class="fancybox-inner">' +
				'<div class="fancybox-infobar">' +
					'<button data-fancybox-prev title="{{PREV}}" class="fancybox-button fancybox-button--left"></button>' +
					'<div class="fancybox-infobar__body">' +
						'<span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span>' +
					'</div>' +
					'<button data-fancybox-next title="{{NEXT}}" class="fancybox-button fancybox-button--right"></button>' +
				'</div>' +
				'<div class="fancybox-toolbar">' +
					'{{BUTTONS}}' +
				'</div>' +
				'<div class="fancybox-navigation">' +
					'<button data-fancybox-prev title="{{PREV}}" class="fancybox-arrow fancybox-arrow--left" />' +
					'<button data-fancybox-next title="{{NEXT}}" class="fancybox-arrow fancybox-arrow--right" />' +
				'</div>' +
				'<div class="fancybox-stage"></div>' +
				'<div class="fancybox-caption-wrap">' +
					'<div class="fancybox-caption"></div>' +
				'</div>' +
			'</div>' +
		'</div>',

	// Loading indicator template
	spinnerTpl : '<div class="fancybox-loading"></div>',

	// Error message template
	errorTpl : '<div class="fancybox-error"><p>{{ERROR}}<p></div>',

	btnTpl : {
		slideShow  : '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"></button>',
		fullScreen : '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fullscreen" title="{{FULL_SCREEN}}"></button>',
		thumbs     : '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"></button>',
		close      : '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"></button>',

		// This small close button will be appended to your html/inline/ajax content by default,
		// if "smallBtn" option is not set to false
		smallBtn   : '<button data-fancybox-close class="fancybox-close-small" title="{{CLOSE}}"></button>'
	},

	// Container is injected into this element
	parentEl : 'body',


	// Focus handling
	// ==============

	// Try to focus on the first focusable element after opening
	autoFocus : true,

	// Put focus back to active element after closing
	backFocus : true,

	// Do not let user to focus on element outside modal content
	trapFocus : true,


	// Module specific options
	// =======================

	fullScreen : {
		autoStart : false,
	},

	touch : {
		vertical : true,  // Allow to drag content vertically
		momentum : true   // Continue movement after releasing mouse/touch when panning
	},

	// Hash value when initializing manually,
	// set `false` to disable hash change
	hash : null,

	// Customize or add new media types
	// Example:
	/*
	media : {
		youtube : {
			params : {
				autoplay : 0
			}
		}
	}
	*/
	media : {},

	slideShow : {
		autoStart : false,
		speed     : 4000
	},

	thumbs : {
		autoStart   : false,   // Display thumbnails on opening
		hideOnClose : true     // Hide thumbnail grid when closing animation starts
	},

	// Callbacks
	//==========

	// See Documentation/API/Events for more information
	// Example:
	/*
		afterShow: function( instance, current ) {
			 console.info( 'Clicked element:' );
			 console.info( current.opts.$orig );
		}
	*/

	onInit       : $.noop,  // When instance has been initialized

	beforeLoad   : $.noop,  // Before the content of a slide is being loaded
	afterLoad    : $.noop,  // When the content of a slide is done loading

	beforeShow   : $.noop,  // Before open animation starts
	afterShow    : $.noop,  // When content is done loading and animating

	beforeClose  : $.noop,  // Before the instance attempts to close. Return false to cancel the close.
	afterClose   : $.noop,  // After instance has been closed

	onActivate   : $.noop,  // When instance is brought to front
	onDeactivate : $.noop,  // When other instance has been activated


	// Interaction
	// ===========

	// Use options below to customize taken action when user clicks or double clicks on the fancyBox area,
	// each option can be string or method that returns value.
	//
	// Possible values:
	//   "close"           - close instance
	//   "next"            - move to next gallery item
	//   "nextOrClose"     - move to next gallery item or close if gallery has only one item
	//   "toggleControls"  - show/hide controls
	//   "zoom"            - zoom image (if loaded)
	//   false             - do nothing

	// Clicked on the content
	clickContent : function( current, event ) {
		return current.type === 'image' ? 'zoom' : false;
	},

	// Clicked on the slide
	clickSlide : 'close',

	// Clicked on the background (backdrop) element
	clickOutside : 'close',

	// Same as previous two, but for double click
	dblclickContent : false,
	dblclickSlide   : false,
	dblclickOutside : false,


	// Custom options when mobile device is detected
	// =============================================

	mobile : {
		clickContent : function( current, event ) {
			return current.type === 'image' ? 'toggleControls' : false;
		},
		clickSlide : function( current, event ) {
			return current.type === 'image' ? 'toggleControls' : "close";
		},
		dblclickContent : function( current, event ) {
			return current.type === 'image' ? 'zoom' : false;
		},
		dblclickSlide : function( current, event ) {
			return current.type === 'image' ? 'zoom' : false;
		}
	},


	// Internationalization
	// ============

	lang : 'en',
	i18n : {
		'en' : {
			CLOSE       : 'Close',
			NEXT        : 'Next',
			PREV        : 'Previous',
			ERROR       : 'The requested content cannot be loaded. <br/> Please try again later.',
			PLAY_START  : 'Start slideshow',
			PLAY_STOP   : 'Pause slideshow',
			FULL_SCREEN : 'Full screen',
			THUMBS      : 'Thumbnails'
		},
		'de' : {
			CLOSE       : 'Schliessen',
			NEXT        : 'Weiter',
			PREV        : 'Zurück',
			ERROR       : 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es später nochmal.',
			PLAY_START  : 'Diaschau starten',
			PLAY_STOP   : 'Diaschau beenden',
			FULL_SCREEN : 'Vollbild',
			THUMBS      : 'Vorschaubilder'
		}
	}
	
  });
  

}); // ready