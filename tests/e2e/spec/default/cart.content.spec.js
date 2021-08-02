import { languageSelectors, openDeepLinkUrl, restartApp } from '../../helpers/utils';
import LoginScreen from '../../screenObjects/login';
import InventoryListScreen from '../../screenObjects/inventoryList';
import CartContent from '../../screenObjects/cart';
import AppHeader from '../../screenObjects/appHeader';
import CheckoutPageOne from '../../screenObjects/checkoutPageOne';
import { LOGIN_USERS } from '../../helpers/e2eConstants';

describe('Cart Content Page', () => {
	const SELECTORS = languageSelectors();

	beforeEach(() => {
		// Restart the app before each session, only not for the first session
		restartApp();
		LoginScreen.waitForIsShown();
	});

	it('should show 2 items in the cart added in the normal flow', () => {
		LoginScreen.signIn(LOGIN_USERS.STANDARD);

		// Add some items to the cart
		InventoryListScreen.waitForIsShown();
		InventoryListScreen.addSwagItemToCart(SELECTORS.products.backpack.name);
		InventoryListScreen.addSwagItemToCart(SELECTORS.products.bikeLight.name);

		// Open the cart
		AppHeader.openCart();
		CartContent.waitForIsShown();

		expect(CartContent.swagItems.length).toEqual(2, 'The amount of items in the cart is not correct.');
	});

	it('should show the items page if continue shopping is selected', () => {
    openDeepLinkUrl('cart/0,1');
    CartContent.waitForIsShown();

		CartContent.continueShopping();
		InventoryListScreen.waitForIsShown();

		expect(CartContent.isShown()).toEqual(false, 'The car content page is still visible');
	});

	it('should update the cart if an item is removed', () => {
    openDeepLinkUrl('cart/0,1');
    CartContent.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(2, 'Cart amount is not correct');

		CartContent.removeSwagItem();

		expect(AppHeader.getCartAmount()).toContain(1, 'The amount if items in the cart is not correct.');

		CartContent.removeSwagItem();

		expect(AppHeader.getCartAmount()).not.toContain(1, 'The amount if items in the cart is not correct.');
	});

	it('should update the cart if an item is removed by swiping', () => {
    openDeepLinkUrl('cart/0,1');
    CartContent.waitForIsShown();

		expect(AppHeader.getCartAmount()).toContain(2, 'Cart amount is not correct');

		CartContent.swipeToOpenDeleteButton();
		CartContent.deleteSwagItem();

		expect(AppHeader.getCartAmount()).toContain(1, 'The amount if items in the cart is not correct.');
	});

	it('should open the checkout page one page if checkout is clicked', () => {
    openDeepLinkUrl('cart/0,1');
    CartContent.waitForIsShown();

		CartContent.goToCheckout();
		CheckoutPageOne.waitForIsShown();

		expect(CartContent.isShown()).toEqual(false, 'The cart content page is still visible');
		expect(CheckoutPageOne.isShown()).toEqual(true, 'The checkout page one is not visible');
	});
});
