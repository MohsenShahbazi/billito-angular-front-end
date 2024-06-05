import { SocialLoginType } from '@intelact/bright';

export function getSocialProviderByDomain(host: string): SocialLoginType {
	switch (host) {
		case 'google.com':
			return SocialLoginType.Google;
		case 'twitter.com':
			return SocialLoginType.Twitter;
		case 'facebook.com':
			return SocialLoginType.Facebook;
		case 'apple.com':
			return SocialLoginType.Apple;
		case 'linkedin.com':
			return SocialLoginType.Linkedin;
	}
}
