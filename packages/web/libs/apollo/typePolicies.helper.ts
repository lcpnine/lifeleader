import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type CreateMandalaChartFailureKeySpecifier = ('errorType' | CreateMandalaChartFailureKeySpecifier)[];
export type CreateMandalaChartFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateMandalaChartSuccessKeySpecifier = ('mandalaChart' | CreateMandalaChartSuccessKeySpecifier)[];
export type CreateMandalaChartSuccessFieldPolicy = {
	mandalaChart?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteAccountFailureKeySpecifier = ('errorType' | DeleteAccountFailureKeySpecifier)[];
export type DeleteAccountFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteAccountSuccessKeySpecifier = ('success' | DeleteAccountSuccessKeySpecifier)[];
export type DeleteAccountSuccessFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteMandalaChartFailureKeySpecifier = ('errorType' | DeleteMandalaChartFailureKeySpecifier)[];
export type DeleteMandalaChartFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeleteMandalaChartSuccessKeySpecifier = ('_id' | DeleteMandalaChartSuccessKeySpecifier)[];
export type DeleteMandalaChartSuccessFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FindPasswordFailureKeySpecifier = ('errorType' | FindPasswordFailureKeySpecifier)[];
export type FindPasswordFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FindPasswordSuccessKeySpecifier = ('success' | FindPasswordSuccessKeySpecifier)[];
export type FindPasswordSuccessFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GetMandalaChartFailureKeySpecifier = ('errorType' | GetMandalaChartFailureKeySpecifier)[];
export type GetMandalaChartFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GetMandalaChartSuccessKeySpecifier = ('mandalaChart' | GetMandalaChartSuccessKeySpecifier)[];
export type GetMandalaChartSuccessFieldPolicy = {
	mandalaChart?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GetUserMandalaChartsFailureKeySpecifier = ('errorType' | GetUserMandalaChartsFailureKeySpecifier)[];
export type GetUserMandalaChartsFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type GetUserMandalaChartsSuccessKeySpecifier = ('mandalaCharts' | GetUserMandalaChartsSuccessKeySpecifier)[];
export type GetUserMandalaChartsSuccessFieldPolicy = {
	mandalaCharts?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MandalaCellKeySpecifier = ('_id' | 'goal' | 'tasks' | MandalaCellKeySpecifier)[];
export type MandalaCellFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	goal?: FieldPolicy<any> | FieldReadFunction<any>,
	tasks?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MandalaChartKeySpecifier = ('_id' | 'centerCell' | 'createdAt' | 'description' | 'lastModifiedAt' | 'private' | 'surroundingCells' | 'title' | 'userId' | MandalaChartKeySpecifier)[];
export type MandalaChartFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	centerCell?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	lastModifiedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	private?: FieldPolicy<any> | FieldReadFunction<any>,
	surroundingCells?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createMandalaChart' | 'deleteAccount' | 'deleteMandalaChart' | 'findPassword' | 'resetPassword' | 'signIn' | 'signOut' | 'signUp' | 'updateMandalaChart' | 'verifyEmail' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createMandalaChart?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteAccount?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteMandalaChart?: FieldPolicy<any> | FieldReadFunction<any>,
	findPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	resetPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	signIn?: FieldPolicy<any> | FieldReadFunction<any>,
	signOut?: FieldPolicy<any> | FieldReadFunction<any>,
	signUp?: FieldPolicy<any> | FieldReadFunction<any>,
	updateMandalaChart?: FieldPolicy<any> | FieldReadFunction<any>,
	verifyEmail?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PurchasedInfoKeySpecifier = ('expiresAt' | 'isPurchased' | 'purchasedAt' | PurchasedInfoKeySpecifier)[];
export type PurchasedInfoFieldPolicy = {
	expiresAt?: FieldPolicy<any> | FieldReadFunction<any>,
	isPurchased?: FieldPolicy<any> | FieldReadFunction<any>,
	purchasedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('checkUser' | 'getMandalaChart' | 'getUser' | 'getUserMandalaCharts' | 'recommendationForSubGoals' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	checkUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getMandalaChart?: FieldPolicy<any> | FieldReadFunction<any>,
	getUser?: FieldPolicy<any> | FieldReadFunction<any>,
	getUserMandalaCharts?: FieldPolicy<any> | FieldReadFunction<any>,
	recommendationForSubGoals?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecommendationKeySpecifier = ('text' | RecommendationKeySpecifier)[];
export type RecommendationFieldPolicy = {
	text?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecommendationFailureKeySpecifier = ('errorType' | RecommendationFailureKeySpecifier)[];
export type RecommendationFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RecommendationSuccessKeySpecifier = ('recommendations' | RecommendationSuccessKeySpecifier)[];
export type RecommendationSuccessFieldPolicy = {
	recommendations?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResetPasswordFailureKeySpecifier = ('errorType' | ResetPasswordFailureKeySpecifier)[];
export type ResetPasswordFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ResetPasswordSuccessKeySpecifier = ('success' | ResetPasswordSuccessKeySpecifier)[];
export type ResetPasswordSuccessFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignInFailureKeySpecifier = ('errorType' | SignInFailureKeySpecifier)[];
export type SignInFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignInSuccessKeySpecifier = ('token' | 'user' | SignInSuccessKeySpecifier)[];
export type SignInSuccessFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignUpFailureKeySpecifier = ('errorType' | SignUpFailureKeySpecifier)[];
export type SignUpFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignUpSuccessKeySpecifier = ('isMailSent' | SignUpSuccessKeySpecifier)[];
export type SignUpSuccessFieldPolicy = {
	isMailSent?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenInfoKeySpecifier = ('expiresAt' | 'isVerified' | 'token' | TokenInfoKeySpecifier)[];
export type TokenInfoFieldPolicy = {
	expiresAt?: FieldPolicy<any> | FieldReadFunction<any>,
	isVerified?: FieldPolicy<any> | FieldReadFunction<any>,
	token?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateMandalaChartFailureKeySpecifier = ('errorType' | UpdateMandalaChartFailureKeySpecifier)[];
export type UpdateMandalaChartFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateMandalaChartSuccessKeySpecifier = ('mandalaChart' | UpdateMandalaChartSuccessKeySpecifier)[];
export type UpdateMandalaChartSuccessFieldPolicy = {
	mandalaChart?: FieldPolicy<any> | FieldReadFunction<any>
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
export type VerifyEmailFailureKeySpecifier = ('errorType' | VerifyEmailFailureKeySpecifier)[];
export type VerifyEmailFailureFieldPolicy = {
	errorType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type VerifyEmailSuccessKeySpecifier = ('success' | VerifyEmailSuccessKeySpecifier)[];
export type VerifyEmailSuccessFieldPolicy = {
	success?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	CreateMandalaChartFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateMandalaChartFailureKeySpecifier | (() => undefined | CreateMandalaChartFailureKeySpecifier),
		fields?: CreateMandalaChartFailureFieldPolicy,
	},
	CreateMandalaChartSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateMandalaChartSuccessKeySpecifier | (() => undefined | CreateMandalaChartSuccessKeySpecifier),
		fields?: CreateMandalaChartSuccessFieldPolicy,
	},
	DeleteAccountFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteAccountFailureKeySpecifier | (() => undefined | DeleteAccountFailureKeySpecifier),
		fields?: DeleteAccountFailureFieldPolicy,
	},
	DeleteAccountSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteAccountSuccessKeySpecifier | (() => undefined | DeleteAccountSuccessKeySpecifier),
		fields?: DeleteAccountSuccessFieldPolicy,
	},
	DeleteMandalaChartFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteMandalaChartFailureKeySpecifier | (() => undefined | DeleteMandalaChartFailureKeySpecifier),
		fields?: DeleteMandalaChartFailureFieldPolicy,
	},
	DeleteMandalaChartSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeleteMandalaChartSuccessKeySpecifier | (() => undefined | DeleteMandalaChartSuccessKeySpecifier),
		fields?: DeleteMandalaChartSuccessFieldPolicy,
	},
	FindPasswordFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FindPasswordFailureKeySpecifier | (() => undefined | FindPasswordFailureKeySpecifier),
		fields?: FindPasswordFailureFieldPolicy,
	},
	FindPasswordSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FindPasswordSuccessKeySpecifier | (() => undefined | FindPasswordSuccessKeySpecifier),
		fields?: FindPasswordSuccessFieldPolicy,
	},
	GetMandalaChartFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GetMandalaChartFailureKeySpecifier | (() => undefined | GetMandalaChartFailureKeySpecifier),
		fields?: GetMandalaChartFailureFieldPolicy,
	},
	GetMandalaChartSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GetMandalaChartSuccessKeySpecifier | (() => undefined | GetMandalaChartSuccessKeySpecifier),
		fields?: GetMandalaChartSuccessFieldPolicy,
	},
	GetUserMandalaChartsFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GetUserMandalaChartsFailureKeySpecifier | (() => undefined | GetUserMandalaChartsFailureKeySpecifier),
		fields?: GetUserMandalaChartsFailureFieldPolicy,
	},
	GetUserMandalaChartsSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | GetUserMandalaChartsSuccessKeySpecifier | (() => undefined | GetUserMandalaChartsSuccessKeySpecifier),
		fields?: GetUserMandalaChartsSuccessFieldPolicy,
	},
	MandalaCell?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MandalaCellKeySpecifier | (() => undefined | MandalaCellKeySpecifier),
		fields?: MandalaCellFieldPolicy,
	},
	MandalaChart?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MandalaChartKeySpecifier | (() => undefined | MandalaChartKeySpecifier),
		fields?: MandalaChartFieldPolicy,
	},
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
	RecommendationFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecommendationFailureKeySpecifier | (() => undefined | RecommendationFailureKeySpecifier),
		fields?: RecommendationFailureFieldPolicy,
	},
	RecommendationSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RecommendationSuccessKeySpecifier | (() => undefined | RecommendationSuccessKeySpecifier),
		fields?: RecommendationSuccessFieldPolicy,
	},
	ResetPasswordFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResetPasswordFailureKeySpecifier | (() => undefined | ResetPasswordFailureKeySpecifier),
		fields?: ResetPasswordFailureFieldPolicy,
	},
	ResetPasswordSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ResetPasswordSuccessKeySpecifier | (() => undefined | ResetPasswordSuccessKeySpecifier),
		fields?: ResetPasswordSuccessFieldPolicy,
	},
	SignInFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignInFailureKeySpecifier | (() => undefined | SignInFailureKeySpecifier),
		fields?: SignInFailureFieldPolicy,
	},
	SignInSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignInSuccessKeySpecifier | (() => undefined | SignInSuccessKeySpecifier),
		fields?: SignInSuccessFieldPolicy,
	},
	SignUpFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignUpFailureKeySpecifier | (() => undefined | SignUpFailureKeySpecifier),
		fields?: SignUpFailureFieldPolicy,
	},
	SignUpSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignUpSuccessKeySpecifier | (() => undefined | SignUpSuccessKeySpecifier),
		fields?: SignUpSuccessFieldPolicy,
	},
	TokenInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenInfoKeySpecifier | (() => undefined | TokenInfoKeySpecifier),
		fields?: TokenInfoFieldPolicy,
	},
	UpdateMandalaChartFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateMandalaChartFailureKeySpecifier | (() => undefined | UpdateMandalaChartFailureKeySpecifier),
		fields?: UpdateMandalaChartFailureFieldPolicy,
	},
	UpdateMandalaChartSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateMandalaChartSuccessKeySpecifier | (() => undefined | UpdateMandalaChartSuccessKeySpecifier),
		fields?: UpdateMandalaChartSuccessFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	VerifyEmailFailure?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VerifyEmailFailureKeySpecifier | (() => undefined | VerifyEmailFailureKeySpecifier),
		fields?: VerifyEmailFailureFieldPolicy,
	},
	VerifyEmailSuccess?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | VerifyEmailSuccessKeySpecifier | (() => undefined | VerifyEmailSuccessKeySpecifier),
		fields?: VerifyEmailSuccessFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;