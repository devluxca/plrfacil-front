import {map} from 'ramda'

export const selecting = (id, multipleChoice) => map(
    object => object.id === id ?
        { ...object, isSelected : !object.isSelected } 
        :
        object.id != id && !multipleChoice ?
            {...object, isSelected:false}
            :
            object
)