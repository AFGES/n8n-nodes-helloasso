import type { INodePropertyOptions } from 'n8n-workflow';

/** HelloAsso `FormType` enum values. */
export const formTypeOptions: INodePropertyOptions[] = [
	{ name: 'Checkout', value: 'Checkout' },
	{ name: 'Crowdfunding', value: 'CrowdFunding' },
	{ name: 'Donation', value: 'Donation' },
	{ name: 'Event', value: 'Event' },
	{ name: 'Membership', value: 'Membership' },
	{ name: 'Payment Form', value: 'PaymentForm' },
	{ name: 'Shop', value: 'Shop' },
];

/** HelloAsso form `FormState` enum values. */
export const formStateOptions: INodePropertyOptions[] = [
	{ name: 'Disabled', value: 'Disabled' },
	{ name: 'Draft', value: 'Draft' },
	{ name: 'Private', value: 'Private' },
	{ name: 'Public', value: 'Public' },
];

/** HelloAsso `PaymentState` enum values. */
export const paymentStateOptions: INodePropertyOptions[] = [
	{ name: 'Authorized', value: 'Authorized' },
	{ name: 'Contested', value: 'Contested' },
	{ name: 'Pending', value: 'Pending' },
	{ name: 'Refunded', value: 'Refunded' },
	{ name: 'Refunding', value: 'Refunding' },
	{ name: 'Refused', value: 'Refused' },
	{ name: 'Registered', value: 'Registered' },
	{ name: 'Unknown', value: 'Unknown' },
];
