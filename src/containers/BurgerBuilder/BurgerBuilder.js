import React,{Component} from 'react';
import Burger from '../../components/Burger/Burger';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
const INGREDIENTS_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};
class BurgerBuilder extends Component{
    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false
    }
    updatePurchaseState(ingredients){
        
        const sum=Object.keys(ingredients)
                      .map(igkey => {
                      return ingredients[igkey];
                              })
                              .reduce((sum,el)=>{
                                  return sum+el;
                                },0);
        this.setState({purchasable:sum>0});
    }
    addIngredientHandler=(type)=>{
        //updating ingredient
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        //updating total price
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice= oldPrice + priceAddition;
    
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    };
    removeIngredientHandler=(type)=>{
        //decrement ingredient
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        //updating total price
        const pricesSubtraction = INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice= oldPrice - pricesSubtraction;
    
        this.setState({totalPrice:newPrice, ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
        
    };
    purchaseHandler=()=>{
        this.setState({purchasing:true});

    };
    purchaseCloseHandler=()=>{
        this.setState({purchasing:false});

    };
    purchaseContinueHandler=()=>{
        alert('YOU Continue');
    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalclosed={this.purchaseCloseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        purchaseCanceled={this.purchaseCloseHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        price={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls ingredientAdded={this.addIngredientHandler}
                               ingredientRemoved={this.removeIngredientHandler} 
                               disabled={disabledInfo} 
                               purchasable={this.state.purchasable}
                               price={this.state.totalPrice}
                               ordered={this.purchaseHandler}
                />

               
            </Aux>
        );
    }


}
export default BurgerBuilder;