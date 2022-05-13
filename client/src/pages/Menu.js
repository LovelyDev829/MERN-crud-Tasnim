import React, { useEffect, useState } from 'react'
import "./Menu.css"
import { BsSearch } from 'react-icons/bs';
import axios from 'axios';
export function Menu() {
    var Scroll = require('react-scroll')
    var Element = Scroll.Element
    var scroller = Scroll.scroller
    const [ categoryName, setCategoryName ] = useState('')
    const [ menuData, setmenuData ] = useState({})
    const [ tempFoodName, setTempFoodName ] = useState('')
    const [ tempFoodDescription, setTempFoodDescription ] = useState('')
    const [ tempFoodPrice, setTempFoodPrice ] = useState(0)
    const [ editCategoryId, setEditCategoryId ] =useState(0)
    const [ editFoodId, setEditFoodId ] = useState(0)
    const [ addFoodId, setAddFoodId ] = useState(0)
    const [ addCategoryFlag, setAddCategoryFlag ] = useState(true)
    function refresh(){
        axios.get('http://localhost:5000/menus/all')
      .then(res => {
        console.log(res.data[0])
        console.log("(Note)-------------Database loaded successfully.")
        setmenuData(res.data[0])
        console.log(menuData)
      })
      .catch((error) => {
        console.log(error)
      })
    }
    useEffect(()=>{
        refresh()
    })
    return (
        <div className='mainBody'>
            <div className='mainBody_left'>
                <div className='leftList_search_top_space' />
                <div className='leftList_search'>
                    <BsSearch className='leftList_search_icon' />
                    <input className='leftList_search_box' placeholder='Search here' />
                </div>
                <div className='leftList_list'>
                    {
                        menuData.categoryList?.map((categoryItem) => {
                            if ( editCategoryId === categoryItem?.category?._id && addCategoryFlag === false) {
                                return(
                                    <div className='leftList_item_div'>
                                        <input className='leftList_item add_input' value={categoryName} placeholder='category name' onChange={
                                            (e)=>{ setCategoryName(e.target.value) }}></input>
                                        <div className='edit_category' onClick={()=>{
                                            const categoryObject={
                                                categoryId : categoryItem?.category?._id,
                                                categoryName : categoryName
                                            }
                                            setCategoryName('')
                                            if(categoryName!==''){
                                                setEditCategoryId(0)
                                                axios.post('http://localhost:5000/menus/editCategory', categoryObject)
                                                    .then(res => console.log(res.data));
                                            }
                                        }}>SUBMIT</div>
                                    </div>
                                )
                            }
                            else {
                                return(
                                    <div className='leftList_item_div' key={'key_category_01'+categoryItem?.category?._id}>
                                        <div className='leftList_item' onDoubleClick={() => {
                                            setAddCategoryFlag(false)
                                            setEditCategoryId(categoryItem?.category?._id)
                                            setCategoryName(categoryItem?.category?.categoryName)
                                        }} onClick={() => {
                                            scroller.scrollTo(("name" + categoryItem?.category?._id), {
                                                duration: 300,
                                                smooth: true,
                                                offset: -80
                                            });
                                        }}>{ categoryItem?.category?.categoryName }</div>
                                        <div className='del_category' onClick={()=>{
                                            const categoryObject={ categoryId : categoryItem?.category?._id }
                                            axios.post('http://localhost:5000/menus/deleteCategory', categoryObject)
                                                .then(res => console.log(res.data));
                                        }}>DELETE</div>
                                    </div>
                                )
                            }
                        })
                    }
                    <div className='leftList_item_div'onClick={() => {
                        setAddCategoryFlag(true)
                        setCategoryName('')
                    }}>
                        <input className='leftList_item add_input' value={ addCategoryFlag===true ? categoryName : '' } placeholder='category name' onChange={
                            (e)=>{ setCategoryName(e.target.value) }}></input>
                        <div className='add_category' onClick={()=>{
                            const categoryObject={
                                categoryNamE : categoryName,
                                foodCount : 0,
                                foodList: []
                            }
                            console.log(categoryName)
                            setCategoryName('')
                            if(categoryName!==''){
                                axios.post('http://localhost:5000/menus/createCategory', categoryObject)
                                    .then(res => console.log(res.data));
                            }
                        }}>ADD</div>
                    </div>
                </div>
            </div>
            <div className='mainBody_center'>
                <div className='centerList_topSpace' />
                {
                    menuData?.categoryList?.map((categoryItem) => {
                        return(
                            <Element name={"name" + categoryItem?.category?._id}>
                                <div className='centerList' key={'key_category_02'+categoryItem?.category?._id}>
                                    <div className='centerList_title' >{ categoryItem?.category?.categoryName }</div>
                                    <div className='centerList_titleSpace' />
                                    {
                                        categoryItem?.category?.foodList?.map((foodItem)=>{
                                            if ( editFoodId === foodItem.food._id && addFoodId===0 ) {
                                                return(
                                                    <div className='centerList_item' 
                                                    onDoubleClick={() => { 
                                                        setEditFoodId(0)
                                                        setTempFoodName('')
                                                        setTempFoodDescription('')
                                                        setTempFoodPrice(0)
                                                    }}>
                                                        <div className='centerList_item_text_div'>
                                                            <input className='centerList_item_text_1' placeholder='Name of Food'
                                                                value = { tempFoodName } onChange={(e)=>{ setTempFoodName(e.target.value) }} />
                                                            <input className='centerList_item_text_2'  placeholder='Some descreiption'
                                                                value = { tempFoodDescription } onChange={(e)=>{ setTempFoodDescription(e.target.value) }} />
                                                            <input className='centerList_item_text_3'  placeholder='Price' type='number'
                                                                value = { tempFoodPrice } onChange={(e)=>{ setTempFoodPrice(e.target.value) }} />
                                                        </div>
                                                        <div className='centerList_item_button submit_button' onClick={ ()=>{
                                                            const foodObject={
                                                                foodId : foodItem.food._id,
                                                                foodName : tempFoodName,
                                                                foodDescription : tempFoodDescription,
                                                                foodPrice: tempFoodPrice
                                                            }
                                                            console.log( "tempFoodName", tempFoodName )
                                                            if( tempFoodName!=='' && tempFoodDescription!=='' && tempFoodPrice!==0 ){
                                                                setEditFoodId(0)
                                                                setTempFoodName('')
                                                                setTempFoodDescription('')
                                                                setTempFoodPrice(0)
                                                                console.log( "foodObject", foodObject )
                                                                axios.post('http://localhost:5000/menus/editFood', foodObject)
                                                                    .then(res => console.log(res.data));
                                                            }}
                                                        }>SUBMIT</div>
                                                    </div>
                                                )
                                            }
                                            else{
                                                return(
                                                    <div className='centerList_item' key={'key_food_01'+foodItem.food._id}
                                                    onDoubleClick={() => { 
                                                        setAddFoodId(0)
                                                        setEditFoodId(foodItem.food._id)
                                                        setTempFoodName(foodItem.food.foodName)
                                                        setTempFoodDescription(foodItem.food.foodDescription)
                                                        setTempFoodPrice(foodItem.food.foodPrice)
                                                    }}>
                                                        <div className='centerList_item_text_div'>
                                                            <div className='centerList_item_text_1'>{ foodItem.food.foodName }</div>
                                                            <div className='centerList_item_text_2'>{ foodItem.food.foodDescription }</div>
                                                            <div className='centerList_item_text_3'>€{ foodItem.food.foodPrice }</div>
                                                        </div>
                                                        <div className='centerList_item_button' onClick={()=>{
                                                            const foodObject={
                                                                categoryId : categoryItem.category._id,
                                                                foodId : foodItem.food._id
                                                            }
                                                            axios.post('http://localhost:5000/menus/deleteFood', foodObject)
                                                            .then(res => console.log(res.data));
                                                        }}>DELETE</div>
                                                    </div>
                                                )
                                            }
                                        })
                                    }
                                    <div className='centerList_item' onClick={() => { setAddFoodId(categoryItem?.category?._id) }}>
                                        <div className='centerList_item_text_div'>
                                            <input className='centerList_item_text_1' placeholder='Name of Food'
                                                value = { addFoodId!==categoryItem?.category?._id ? '' : tempFoodName } onChange={(e)=>{ setTempFoodName(e.target.value) }} />
                                            <input className='centerList_item_text_2'  placeholder='Some descreiption'
                                                value = { addFoodId!==categoryItem?.category?._id ? '' : tempFoodDescription } onChange={(e)=>{ setTempFoodDescription(e.target.value) }} />
                                            <input className='centerList_item_text_3'  placeholder='Price' type='number'
                                                value = { addFoodId!==categoryItem?.category?._id ? '' : tempFoodPrice } onChange={(e)=>{ setTempFoodPrice(e.target.value) }} />
                                        </div>
                                        <div className='centerList_item_button add_button' onClick={ ()=>{
                                            const foodObject={
                                                categoryId : categoryItem.category._id,
                                                foodName : tempFoodName,
                                                foodDescription : tempFoodDescription,
                                                foodPrice: tempFoodPrice
                                            }
                                            console.log( "tempFoodName", tempFoodName )
                                            if( tempFoodName!=='' && tempFoodDescription!=='' && tempFoodPrice!==0 ){
                                                setAddFoodId(0)
                                                setTempFoodName('')
                                                setTempFoodDescription('')
                                                setTempFoodPrice(0)
                                                // console.log(tempFoodName)
                                                console.log( "foodObject", foodObject )
                                                axios.post('http://localhost:5000/menus/createFood', foodObject)
                                                    .then(res => console.log(res.data));
                                            }}
                                        }>ADD</div>
                                    </div>
                                </div>
                            </Element>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Menu
