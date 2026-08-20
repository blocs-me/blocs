# TODOs

Unrelated issues discovered during other work. Fix separately.

## Flaky date-dependent AnalyticsBarChart tests

`src/components/widgets/AnalyticsBarChart/useAnalyticsBarChartDateRange.test.tsx`
asserts that the default weekly/monthly range starts on a Monday
(`new Date(result.current[0].date).getDay()).toBe(1)`). These use the real
system date, so they fail on any day where the computed start isn't a Monday.

Discovered 2026-08-20 while adding the Clock font-size setting (the tests were
already failing on the base commit; the Clock change is unrelated). Fix by
mocking the clock in the test (e.g. `jest.useFakeTimers().setSystemTime(...)`).
