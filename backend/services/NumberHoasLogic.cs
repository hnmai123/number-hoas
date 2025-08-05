using NumberHoas.Models;
namespace NumberHoas.Services;
/*
    PYTHON FizzBuzz Style
    from collections import Counter
    from math import prod

    # Prime factor decomposition
    def prime_factors(n):
        i = 2
        factors = []
        while i * i <= n:
            while n % i == 0:
                factors.append(i)
                n //= i
            i += 1
        if n > 1:
            factors.append(n)
        return factors

    # Convert rule into its own prime factor counter
    def rule_to_counter(rule):
        return Counter(prime_factors(rule['divisibleNumber']))

    # Check if a rule can apply to the current factors
    def can_apply(factors, rule_counter):
        for k, v in rule_counter.items():
            if factors[k] < v:
                return False
        return True

    # Subtract rule_counter from current factors
    def apply_rule(factors, rule_counter):
        return factors - rule_counter

    # DFS to find valid replacement
    def find_replacements(factors, rules, rule_counters, path):
        if sum(factors.values()) == 0:
            return [''.join(path)]
        results = []
        for i, rule in enumerate(rules):
            rule_counter = rule_counters[i]
            if can_apply(factors, rule_counter):
                new_factors = apply_rule(factors, rule_counter)
                new_path = path + [rule['replacedWord']]
                results += find_replacements(new_factors, rules, rule_counters, new_path)
        return results

    def getFizzBuzzStyleString(n, rules):
        factors = prime_factors(n)
        factor_counter = Counter(factors)
        rule_counters = [rule_to_counter(rule) for rule in rules]

        outputs = find_replacements(factor_counter, rules, rule_counters, [])

        return outputs if outputs else ["Invalid"]
*/
public class NumberHoasLogic
{
    // Get prime factors of a number
    public static List<int> GetPrimeFactors(int number)
    {
        var factors = new List<int>();
        int n = number;
        for (int i = 2; i <= Math.Sqrt(n); i++)
        {
            while (n % i == 0)
            {
                factors.Add(i);
                n /= i;
            }
        }
        if (n > 1) factors.Add(n);
        return factors;
    }

    // Convert rule into its own prime factor counter
    public static Dictionary<int, int> RuleToCounter(Rule rule)
    {
        var factors = GetPrimeFactors(rule.divisibleNumber);
        var counter = new Dictionary<int, int>();
        foreach (var f in factors)
        {
            if (!counter.ContainsKey(f))
                counter[f] = 0;
            counter[f]++;
        }
        return counter;
    }

    // Check if a rule can apply to the current factors
    public static bool CanApply(Dictionary<int, int> factors, Dictionary<int, int> ruleCounter)
    {
        foreach (var kv in ruleCounter)
        {
            if (!factors.ContainsKey(kv.Key) || factors[kv.Key] < kv.Value)
                return false;
        }
        return true;
    }

    // Subtract rule_counter from current factors
    public static Dictionary<int, int> ApplyRule(Dictionary<int, int> factors, Dictionary<int, int> ruleCounter)
    {
        var newFactors = new Dictionary<int, int>(factors);
        foreach (var kv in ruleCounter)
        {
            newFactors[kv.Key] -= kv.Value;
            if (newFactors[kv.Key] == 0)
                newFactors.Remove(kv.Key);
        }
        return newFactors;
    }

    // DFS to find valid replacement
    public static List<string> FindReplacements(
        Dictionary<int, int> factors,
        List<Rule> rules,
        List<Dictionary<int, int>> ruleCounters,
        List<string> path)
    {
        if (factors.Values.Sum() == 0)
            return new List<string> { string.Concat(path) };

        var results = new List<string>();
        for (int i = 0; i < rules.Count; i++)
        {
            var ruleCounter = ruleCounters[i];
            if (CanApply(factors, ruleCounter))
            {
                var newFactors = ApplyRule(factors, ruleCounter);
                var newPath = new List<string>(path) { rules[i].replacedWord };
                results.AddRange(FindReplacements(newFactors, rules, ruleCounters, newPath));
            }
        }
        return results;
    }
    public static List<string> GetCorrectAnswers(int questionNumber, List<Rule> rules) // 12 rules 4: foo, 3: boo
    {
        var factors = GetPrimeFactors(questionNumber);
        var factorCounter = new Dictionary<int, int>();
        foreach (var f in factors)
        {
            if (!factorCounter.ContainsKey(f))
                factorCounter[f] = 0;
            factorCounter[f]++;
        }

        var ruleCounters = rules.Select(rule => RuleToCounter(rule)).ToList();

        var outputs = FindReplacements(factorCounter, rules, ruleCounters, new List<string>());

        return outputs.Count > 0 ? outputs : new List<string> { "" };
    }
}