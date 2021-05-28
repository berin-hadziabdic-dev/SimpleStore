
/*
* RjStoreClass is a simple writable and readble store.
* */
class SimpleStore<Type> {

    private key_iterator: number;
    private subscribers: {[key:string]:UpdateFunction<Type>};
    private value:any;

    public RjStore(initialValue:any)
    {
        this.key_iterator = 0;
        this.subscribers = {}
    }

    /**
    *   subscribe is used to subscribe to a declared store.
     *   @param callback:UpdateFunction (value:any) value will be passed to your call back
     *   anytime the store is updated. You can use this then to update your react state.(Pass it whatever
     *   function you got back with useState..
     *   @returns Function returns a function which is used to remove the component which called
     *   sub. You should call this function when you know the component will be destoryed.
    * */
    public read(callback:UpdateFunction<Type>) : Function
    {
            let key:string = this.key_iterator +"";
            this.subscribers[key] = callback;
            return () => { delete this.subscribers[key]};
    }

    /*
    * update pushes a new value into the store and calls the callback passed into read for
    * all active subscribers so that state can be updated.
    * **/
    public update(value:any):void
    {
        this.value = value
        let subscriberKeys:Array<String> = Object.keys(this.subscribers)

        for(let key of subscriberKeys)
            this.subscribers[key+""](value) //push updated values to subscribers
    }


}
/**
 * @type UpdateFunction defines the signature of the functions which can be passed to the subscribe method.
* */
type UpdateFunction<Type> = (value:Type) => void

export{ SimpleStore,UpdateFunction};