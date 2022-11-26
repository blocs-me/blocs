const largestFreq = (nums: number[]) => {
  const counter = {}

  for (let num of nums) {
    counter[num] ? counter[num]++ : (counter[num] = 1)
  }

  let largest = 0

  nums.forEach((num) => {
    if (counter[num] > largest) {
      largest = num
    }
  })

  return largest
}

export default largestFreq
