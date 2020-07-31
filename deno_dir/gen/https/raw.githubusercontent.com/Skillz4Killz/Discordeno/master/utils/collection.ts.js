import { chooseRandom } from "./utils.ts";
export default class Collection extends Map {
    set(key, value) {
        if (this.maxSize || this.maxSize === 0) {
            if (this.size >= this.maxSize)
                return this;
        }
        return super.set(key, value);
    }
    array() {
        return [...this.values()];
    }
    first() {
        return this.values().next().value;
    }
    last() {
        return [...this.values()][this.size - 1];
    }
    random() {
        return chooseRandom([...this.values()]);
    }
    find(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (callback(value, key))
                return value;
        }
        return;
    }
    filter(callback) {
        const relevant = new Collection();
        this.forEach((value, key) => {
            if (callback(value, key))
                relevant.set(key, value);
        });
        return relevant;
    }
    map(callback) {
        const results = [];
        for (const key of this.keys()) {
            const value = this.get(key);
            results.push(callback(value, key));
        }
        return results;
    }
    some(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (callback(value, key))
                return true;
        }
        return false;
    }
    every(callback) {
        for (const key of this.keys()) {
            const value = this.get(key);
            if (!callback(value, key))
                return false;
        }
        return true;
    }
    reduce(callback, initialValue) {
        let accumulator = initialValue;
        for (const key of this.keys()) {
            const value = this.get(key);
            accumulator = callback(accumulator, value, key);
        }
        return accumulator;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sbGVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbGxlY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLFlBQVksQ0FBQztBQUUxQyxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQWlCLFNBQVEsR0FBUztJQUdyRCxHQUFHLENBQUMsR0FBTSxFQUFFLEtBQVE7UUFFbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssQ0FBQyxFQUFFO1lBQ3RDLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTztnQkFBRSxPQUFPLElBQUksQ0FBQztTQUM1QztRQUVELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUVELEtBQUs7UUFDSCxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBRUQsS0FBSztRQUNILE9BQU8sSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNwQyxDQUFDO0lBRUQsSUFBSTtRQUNGLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELE1BQU07UUFDSixPQUFPLFlBQVksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsSUFBSSxDQUFDLFFBQXVDO1FBQzFDLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLENBQUM7WUFDN0IsSUFBSSxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztnQkFBRSxPQUFPLEtBQUssQ0FBQztTQUN4QztRQUVELE9BQU87SUFDVCxDQUFDO0lBRUQsTUFBTSxDQUFDLFFBQXVDO1FBQzVDLE1BQU0sUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUMxQixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2dCQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVELEdBQUcsQ0FBSSxRQUFpQztRQUN0QyxNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7UUFDbkIsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUUsQ0FBQztZQUM3QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUNwQztRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxJQUFJLENBQUMsUUFBdUM7UUFDMUMsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDN0IsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUUsQ0FBQztZQUM3QixJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQXVDO1FBQzNDLEtBQUssTUFBTSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQzdCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFFLENBQUM7WUFDN0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2dCQUFFLE9BQU8sS0FBSyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsTUFBTSxDQUNKLFFBQWlELEVBQ2pELFlBQWdCO1FBRWhCLElBQUksV0FBVyxHQUFNLFlBQWEsQ0FBQztRQUVuQyxLQUFLLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUM3QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBRSxDQUFDO1lBQzdCLFdBQVcsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqRDtRQUVELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7Q0FDRiJ9