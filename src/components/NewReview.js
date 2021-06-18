const NewReview = () => {
    return(
        <form>
            {/* value should be logged in user */}
            {/* this field can be hidden */}
            <input name="reviewer" type='text' value='user.id' disabled />
            <label>
                Rating 
                <input name="rating" type='number' min="0" max="5"/>
            </label>
            <label>
                Review       {/* maxlength to set up */}
                <textarea name="review" maxlength="500">leave a review..</textarea>
            </label>
            <button type='submit'>publish</button>
        </form>
    )
}

export default NewReview