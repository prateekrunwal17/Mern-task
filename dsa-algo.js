function twoSum(nums, target) {
    if (!Array.isArray(nums) || nums.length < 2) {
      throw new Error("Input must be an array with at least two elements");
    }
  
    const index = new Map();
  
    for (let i = 0; i < nums.length; i++) {
      const a = target - nums[i];
  
      
      if (index.has(a)) {
        return [index.get(a), i]; 
      }
  
      index.set(nums[i], i);
    }
   
    throw new Error("No solution found that adds up to the target");
  }
  
  const nums = [2, 7, 11, 15];
  const target = 9;
  
  try {
    const result = twoSum(nums, target);
    console.log(result);
  } catch (error) {
    console.error(error.message);
  }
  