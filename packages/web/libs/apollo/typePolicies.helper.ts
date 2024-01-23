import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type MutationKeySpecifier = ('findPassword' | 'resetPassword' | 'signIn' | 'signUp' | 'verifyEmail' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	findPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	resetPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	signIn?: FieldPolicy<any> | FieldReadFunction<any>,
	signUp?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PurchasedInfoKeySpecifier = ('expiresAt' | 'isPurchased' | 'purchasedAt' | PurchasedInfoKeySpecifier)[];
export type PurchasedInfoFieldPolicy = {
	expiresAt?: FieldPolicy<any> | FieldReadFunction<any>,
	isPurchased?: FieldPolicy<any> | FieldReadFunction<any>,
	purchasedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getUser' | 'subGoals' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getUser?: FieldPolicy<any> | FieldReadFunction<any>,
	subGoals?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecommendationKeySpecifier = ('text' | RecommendationKeySpecifier)[];
export type RecommendationFieldPolicy = {
	text?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignInSuccessResponseKeySpecifier = ('token' | 'user' | SignInSuccessResponseKeySpecifier)[];
export type SignInSuccessResponseFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenInfoKeySpecifier = ('expires' | 'isVerified' | 'token' | TokenInfoKeySpecifier)[];
export type TokenInfoFieldPolicy = {
	expires?: FieldPolicy<any> | FieldReadFunction<any>,
	isVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('_id' | 'createdAt' | 'email' | 'emailVerification' | 'nickname' | 'purchasedInfo' | 'resetPassword' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	emailVerification?: FieldPolicy<any> | FieldReadFunction<any>,
	nickname?: FieldPolicy<any> | FieldReadFunction<any>,
	purchasedInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	resetPassword?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	PurchasedInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PurchasedInfoKeySpecifier | (() => undefined | PurchasedInfoKeySpecifier),
		fields?: PurchasedInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Recommendation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecommendationKeySpecifier | (() => undefined | RecommendationKeySpecifier),
		fields?: RecommendationFieldPolicy,
	},
	SignInSuccessResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignInSuccessResponseKeySpecifier | (() => undefined | SignInSuccessResponseKeySpecifier),
		fields?: SignInSuccessResponseFieldPolicy,
	},
	TokenInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenInfoKeySpecifier | (() => undefined | TokenInfoKeySpecifier),
		fields?: TokenInfoFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;