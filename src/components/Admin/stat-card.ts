"use server"

import { createClient } from "../../../utils/supabase/server";

interface GetCountParams {
    data: string;
}

interface SupabaseResponse {
    count: number | null;
    error: Error | null;
}

export async function getCount(data: GetCountParams['data']): Promise<SupabaseResponse['count']> {
    const supabase = await createClient();
    // Fetch the count according to the tabl e
    const { count, error }: SupabaseResponse = await supabase.from(data)
        .select('*', { count: 'exact' });

    if (error) {
        console.error('Error fetching data', error);
    } else {
        console.log('Total count', count);
    }

    return count;
}

export async function countTotalOrders() {
    // Fetch the total sum of the 'total' field in the orders table
    const supabase = await createClient();


    const { data, error } = await supabase
        .from('orders')
        .select('total');

    // Calculate the sum of the total field
    const totalSum = data ? data.reduce((acc, order) => acc + parseFloat(order.total), 0) : 0;

    if (error) {
    console.error('Error fetching total sum of orders:', error);
    } else {
    console.log('Total sum of all orders:', data);
    }

    return totalSum;
}
