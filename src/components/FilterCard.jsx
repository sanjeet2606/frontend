import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const fitlerData = [
    {
        fitlerType: "Location",
        array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
    },
    {
        fitlerType: "Industry",
        array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
    },
    {
        fitlerType: "Salary",
        array: ["0-40000", "42000-20000000", "100000-500000"]
    },
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();

    const changeHandler = (value) => {
        setSelectedValue(value);
        if (fitlerData[2].array.includes(value)) {
            const [min, max] = value.split('-').map(v => parseInt(v.replace(/[^\d]/g, '')));
            dispatch(setSearchedQuery({ salary: { min, max } }));
        } else {
            dispatch(setSearchedQuery(value)); // Ensure this is consistent with Jobs component expectation
        }
    };

    useEffect(() => {
        if (selectedValue) {
            if (fitlerData[2].array.includes(selectedValue)) {
                const [min, max] = selectedValue.split('-').map(v => parseInt(v.replace(/[^\d]/g, '')));
                dispatch(setSearchedQuery({ salary: { min, max } }));
            } else {
                dispatch(setSearchedQuery(selectedValue));
            }
        }
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-3 rounded-md'>
            <h1 className='font-bold text-lg'>Filter Jobs</h1>
            <hr className='mt-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    fitlerData.map((data, index) => (
                        <div key={index}>
                            <h1 className='font-bold text-lg'>{data.fitlerType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`;
                                    return (
                                        <div className='flex items-center space-x-2 my-2' key={itemId}>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label htmlFor={itemId}>{item}</Label>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    ))
                }
            </RadioGroup>
        </div>
    );
}

export default FilterCard