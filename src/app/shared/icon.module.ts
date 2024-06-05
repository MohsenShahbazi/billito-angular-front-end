import { NgModule } from '@angular/core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
	faDownload,
	faFileInvoiceDollar,
	faGauge,
	faUser,
	faArrowsToDot,
	faArrowLeft,
	faArrowRight,
	faArrowUp,
	faArrowDown,
	faChevronLeft,
	faChevronRight,
	faChevronUp,
	faChevronDown,
	faCalendar,
	faCalendarDays,
	faTimes,
	faEnvelope,
	faPhone,
	faLocationDot,
	faBookmark as faBookmarkSelected,
	faHeart as faHeartSelected,
	faShareFromSquare as faShareSolid,
	faMagnifyingGlass,
	faFilter,
	faArrowDownWideShort,
	faSort,
	faCheck,
	faCheckCircle,
	faBars,
	faArrowPointer,
	faArrowUpRightFromSquare,
	faPaperPlane,
	faClock,
	faEye,
	faCircleInfo,
	faTriangleExclamation,
	faMapLocationDot,
	// content type icons
	faFileLines,
	faBookOpen,
	faHeadphones,
	faCirclePlay,
	faNewspaper,
	faMicrophone,
	faQuoteRight,
	faComment,
	faComments,
	faList,
	faIcons,
	faFaceRollingEyes
} from '@fortawesome/free-solid-svg-icons';
import {
	faGoogle,
	faMicrosoft,
	faFacebookF,
	faInstagram,
	faLinkedinIn,
	faXTwitter,
	faGooglePlay,
	faAppStore
} from '@fortawesome/free-brands-svg-icons';
import {
	faBookmark,
	faHeart,
	faCircle,
	faSquare,
	faShareFromSquare as faShareRegular,
	faComment as faCommentRegular,
	faComments as faCommentsRegular,
	faEye as faEyeRegular
} from '@fortawesome/free-regular-svg-icons';

@NgModule({
	imports: [FontAwesomeModule],
	exports: [FontAwesomeModule]
})
export class IconModule {
	constructor(library: FaIconLibrary) {
		library.addIcons(
			faFileInvoiceDollar,
			faGauge,
			faUser,
			faArrowsToDot,
			faArrowLeft,
			faArrowRight,
			faArrowUp,
			faArrowDown,
			faChevronLeft,
			faChevronRight,
			faChevronUp,
			faChevronDown,
			faCalendar,
			faCalendarDays,
			faTimes,
			faEnvelope,
			faPhone,
			faLocationDot,
			// user action (bookmark, like, share, etc..)
			faBookmarkSelected,
			faHeartSelected,
			faShareSolid,
			// button actions
			faMagnifyingGlass,
			faFilter,
			faArrowDownWideShort,
			faSort,
			faCheck,
			faCheckCircle,
			faBars,
			faArrowUpRightFromSquare,
			faDownload,
			faPaperPlane,
			faComment,
			faComments,
			faClock,
			faList,
			faIcons,
			faFilter,
			faArrowPointer,
			faEye,
			faCircleInfo,
			faTriangleExclamation,
			faMapLocationDot,
			// content type icons
			faFileLines,
			faBookOpen,
			faHeadphones,
			faCirclePlay,
			faNewspaper,
			faMicrophone,
			faQuoteRight,
			faFaceRollingEyes
		);
		// regular icons
		library.addIcons(
			faBookmark,
			faHeart,
			faCircle,
			faSquare,
			faShareRegular,
			faCommentRegular,
			faCommentsRegular,
			faEyeRegular
		);
		// brand icons
		library.addIcons(
			faGoogle,
			faMicrosoft,
			faFacebookF,
			faInstagram,
			faLinkedinIn,
			faXTwitter,
			faGooglePlay,
			faAppStore
		);
	}
}
