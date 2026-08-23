@IsTest
private class HelloWorldTest {

    @IsTest
    static void testSayHello() {
        String result = HelloWorld.sayHello();

        System.assertEquals(
            'Hello Salesforce Developer',
            result
        );
    }
}