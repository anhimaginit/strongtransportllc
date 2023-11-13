<!DOCTYPE html>
<html lang="en-us" <?php echo implode(' ', array_map(function ($prop, $value) {
						return $prop . '="' . $value . '"';
					}, array_keys($page_html_prop), $page_html_prop));
					?>>

<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="">
	<meta name="author" content="">

	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />

	<!-- Basic Styles -->
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
   	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/bootstrap-select.css">
	<!-- SmartAdmin Styles : Caution! DO NOT change the order -->
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/smartadmin-production-plugins.min.css">
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/smartadmin-production.min.css">
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/smartadmin-skins.min.css">

	<!-- SmartAdmin RTL Support is under construction-->
	<link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/smartadmin-rtl.min.css">

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/15.0.1/css/intlTelInput.css">
	<!-- auto complete tagsinput -->
	<link rel="stylesheet" href="<?= ASSETS_URL ?>/js/plugin/tags-input-autocomplete/src/jquery.tagsinput-revisited.css">

	<link type="text/css" rel="stylesheet" href="https://cdn.firebase.com/libs/firebaseui/2.3.0/firebaseui.css" />
	<?php
    //print_r($_SESSION['user_info']); die();
	if ($page_css) {
		foreach ($page_css as $css) {
			echo '<link rel="stylesheet" type="text/css" media="screen" href="' . ASSETS_URL . '/css/' . $css . '?value=' . rand() . '">';
		}
	}
	?>


	<!-- Demo purpose only: goes with demo.js, you can delete this css when designing your own WebApp -->
	<!-- <link rel="stylesheet" type="text/css" media="screen" href="<?php echo ASSETS_URL; ?>/css/demo.min.css"> -->
	<link type="text/css" rel="stylesheet" href="<?php echo ASSETS_URL; ?>/css/take-screenshots.css?value=<?= rand() ?>" />


	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css" />
	<!-- GOOGLE FONT -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:400italic,700italic,300,400,700">

	<!-- Specifying a Webpage Icon for Web Clip
			 Ref: https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html -->
	<link rel="apple-touch-icon" href="<?php echo ASSETS_URL; ?>/img/splash/sptouch-icon-iphone.png">
	<link rel="apple-touch-icon" sizes="76x76" href="<?php echo ASSETS_URL; ?>/img/splash/touch-icon-ipad.png">
	<link rel="apple-touch-icon" sizes="120x120" href="<?php echo ASSETS_URL; ?>/img/splash/touch-icon-iphone-retina.png">
	<link rel="apple-touch-icon" sizes="152x152" href="<?php echo ASSETS_URL; ?>/img/splash/touch-icon-ipad-retina.png">

	<!-- iOS web-app metas : hides Safari UI Components and Changes Status Bar Appearance -->
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">

	<!-- Startup image for web apps -->
	<link rel="apple-touch-startup-image" href="<?php echo ASSETS_URL; ?>/img/splash/ipad-landscape.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:landscape)">
	<link rel="apple-touch-startup-image" href="<?php echo ASSETS_URL; ?>/img/splash/ipad-portrait.png" media="screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation:portrait)">
	<link rel="apple-touch-startup-image" href="<?php echo ASSETS_URL; ?>/img/splash/iphone.png" media="screen and (max-device-width: 320px)">

	<style>
		:root {
			--background: <?= $_SESSION['settingPage']->background != '' ? $_SESSION['settingPage']->background : '#f3f3f3' ?>;
			--top-menu-color: <?= $_SESSION['settingPage']->top_menu_color != '' ? $_SESSION['settingPage']->top_menu_color : '#474544' ?>;
			--color-site: <?= $_SESSION['settingPage']->color_site  != '' ? $_SESSION['settingPage']->color_site  : '#3a3633' ?>;
			--color-site-hover: <?= $_SESSION['settingPage']->color_site_hover != '' ? $_SESSION['settingPage']->color_site_hover : 'unset' ?>;
			--navigation: <?= $_SESSION['settingPage']->navigation != '' ? $_SESSION['settingPage']->navigation : '#c0bbb7' ?>;

		}

		body {
			background: var(--background);
			background-image: unset;
		}

		#header {
			background: var(--top-menu-color);
			background-image: unset;
		}

		#project-selector {
			color: var(--navigation);
		}

		#project-selector:hover {
			color: var(--navigation);
		}

		#ribbon,
		#left-panel,
		.page-footer,
		nav ul ul,
		.minified nav>ul>li>ul,
		.minified nav>ul>li>ul>li {
			background: var(--color-site);
			background-color: var(--color-site);
			color: var(--navigation);
		}

		nav ul ul li>a:hover,
		nav ul ul li>a:focus,
		nav ul li>a:hover,
		nav ul li>a:focus,
		nav ul li.active,
		.minifyme {
			background: var(--color-site-hover);
		}

		nav ul li a,
		.login-info a {
			color: var(--navigation);
		}

	</style>


</head>

<body <?php echo implode(' ', array_map(function ($prop, $value) {
			return $prop . '="' . $value . '"';
		}, array_keys($page_body_prop), $page_body_prop)); ?>>
	<?php
